import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUpload, FaCar, FaKeyboard, FaDatabase } from "react-icons/fa";

const steps = [
  { id: 1, icon: <FaUpload />, title: "Image Upload", desc: "User uploads an image." },
  { id: 2, icon: <FaCar />, title: "License Plate Detection (YOLO)", desc: "YOLOv8 detects the license plate." },
  { id: 3, icon: <FaKeyboard />, title: "Character Recognition", desc: "paddleOCR extracts characters from the plate." },
  { id: 4, icon: <FaDatabase />, title: "Database Validation", desc: "Extracted data is validated." },
];

const WorkingDemo1 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, []);
  return (
    <div className="text-white flex flex-col items-center justify-center mt-25">
      <h2 className="text-3xl font-bold mb-6">ANPR Process Flow</h2>
      <div className="text-center bg-blend-color text-red-400 p-6 border rounded-lg shadow-lg shadow-blue-500 transition-transform transform hover:scale-105 hover:shadow-lg hover:text-blue-400 group">
        <div className="text-5xl mb-4 text-red-400 group-hover:text-blue-400">{steps[currentStep].icon}</div>
        <h3 className="text-xl font-semibold">{steps[currentStep].title}</h3>
        <p className="mt-2">{steps[currentStep].desc}</p>
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          className="bg-gray-700 px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
          className="bg-amber-600 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkingDemo1;
