from flask import Flask,jsonify,request,send_file
from flask_cors import CORS
import plate_detection
import os
import sqlite3
from contact import configure_mail,send_contact_email

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        return "", 200

mail = configure_mail(app)

def create_connection():
    return sqlite3.connect("number_plate_info.db")

def get_owner_details(plate_number):
    conn= create_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT owner_name,address,vehicle_number,phone_number
    from vehicle_data_info 
    WHERE vehicle_number = ?              
""",(plate_number,))
    result = cursor.fetchone()
    conn.close()
    if result:
        return {
            "owner_name": result[0],
            "address": result[1],
            "vehicle_number": result[2],
            "phone_number": result[3]
        }
    else:
        return None

@app.route('/uploads',methods=['POST'])
def process_image():
    try:
        if 'image'not in request.files:
            print("No image file found in request")
            return jsonify({"error":"No image file found"}),400
        
        image_file = request.files['image']
        print(f"received file:{image_file.filename}")

        processed_image_path,plate_text = plate_detection.detect_and_extract_plate(image_file)

        if processed_image_path is None:
            print("failed to process image")
            return jsonify({"error":"failed to process image"}),500
        
        owner_details = get_owner_details(plate_text)

        return({
            "message":"Image Processed Successfully",
            "image_url":"http://127.0.0.1:5000/processed_image",
            "results":plate_text,
            "owner_details":owner_details if owner_details else "Number Plate is Invalid"
        })
    except Exception as e:
        print(f"error in processing image : {str}")
        return jsonify({"error":str(e)}),500
@app.route('/processed_image',methods=['GET'])
def get_processed_image():
    process_image_path = "processed_images/processed.jpg"
    if os.path.exists(process_image_path):
        return send_file("processed_images/processed.jpg",mimetype='image/jpeg')
    else:
        return jsonify({"error":"processed img not found"}),404

@app.route('/send-email',methods=['POST','OPTIONS'])
def send_email():
    try:
        data = request.json
        name = data.get("name")
        email = data.get("email")
        message = data.get("message")
       
        if not name or not email or not message:
            return jsonify({"error":"ALL fields are required"}),400
        success, error_message = send_contact_email(mail, name, email, message)
        if success:
            return jsonify({"message": "Email sent successfully!"}), 200
        else:
            return jsonify({"error": error_message}), 500

    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({"error": "Failed to send email. Try again later."}), 500

if __name__ == '__main__':
    app.run(debug=True)