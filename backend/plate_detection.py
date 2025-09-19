import cv2
import numpy as np
from ultralytics import YOLO
from paddleocr import PaddleOCR
import os
import re


model = YOLO("best.pt")
ocr = PaddleOCR(use_angle_cls=True, lang="en") 


OUTPUT_FOLDER = "processed_images"
os.makedirs(OUTPUT_FOLDER, exist_ok=True)


def validate_plate_format(plate_text):
    pattern = r'^[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{4}$'
    return re.match(pattern, plate_text) is not None


def preprocess_plate(plate_roi):
    try:
        gray_plate = cv2.cvtColor(plate_roi, cv2.COLOR_BGR2GRAY)
        blurred_plate = cv2.GaussianBlur(gray_plate, (5, 5), 0)
        enhanced_plate = cv2.equalizeHist(blurred_plate)
        thresholded_plate = cv2.adaptiveThreshold(
            blurred_plate, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
        )
        kernel = np.ones((3, 3), np.uint8)
        thresholded_plate = cv2.morphologyEx(thresholded_plate, cv2.MORPH_CLOSE, kernel)
        resized_plate = cv2.resize(thresholded_plate, (200, 50))
        return resized_plate
    except Exception as e:
        print(f"Error in preprocessing: {str(e)}")
        return None


def detect_and_extract_plate(image_file):
    try:
        image_bytes = image_file.read()
        np_img = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        if image is None:
            print("Error: Image could not be loaded")
            return None, None

        results = model(image)
        print("DEBUG: YOLO output:", results)

        
        if not results or not results[0].boxes or len(results[0].boxes) == 0:
            print("Error: No plates detected!")
            return None, None

        best_plate_text = None
        best_confidence = 0.0

        for result in results:
            for box in result.boxes.data:
                x1, y1, x2, y2, conf = map(float, box[:5])
                plate_roi = image[int(y1):int(y2), int(x1):int(x2)]

                if plate_roi is None or plate_roi.size == 0:
                    print("Error: Extracted plate region is empty!")
                    return None, None

                preprocessed_plate = preprocess_plate(plate_roi)
                if preprocessed_plate is None:
                    print("Error: Preprocessing failed!")
                    return None, None

                
                preprocessed_plate_rgb = cv2.cvtColor(preprocessed_plate, cv2.COLOR_GRAY2RGB)

                
                temp_image_path = "temp_plate.jpg"
                cv2.imwrite(temp_image_path, preprocessed_plate_rgb)

                
                ocr_results = ocr.ocr(temp_image_path, cls=True)
                
                
                print("DEBUG: PaddleOCR raw output:", ocr_results)

                
                extracted_text = ""
                if ocr_results:
                    for res in ocr_results:
                        for line in res:
                            extracted_text += line[1][0]  

                plate_text = extracted_text.replace(" ", "")
                plate_text = re.sub(r'[^A-Z0-9]', '', plate_text)
                plate_text = plate_text.replace("IND", "")

                if validate_plate_format(plate_text) and conf > best_confidence:
                    best_plate_text = plate_text
                    best_confidence = conf
                print(f"Extracted Plate Text: {plate_text}")
                break  

        processed_image_path = os.path.join(OUTPUT_FOLDER, "processed.jpg")
        cv2.imwrite(processed_image_path, image)

        return processed_image_path, plate_text  

    except Exception as e:
        print(f"Error in detect_and_extract_plate: {str(e)}")
        return None,None