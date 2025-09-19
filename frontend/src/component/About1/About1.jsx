import React from 'react'
import { useEffect,useState } from 'react'
import { FaCar } from "react-icons/fa";
import { FaReply } from "react-icons/fa";
import { MdOutlineManageSearch } from "react-icons/md";
import { IoIosDocument } from "react-icons/io";
import v1 from '../video/vediocar1.mp4'
import v2 from '../video/numbervedio.mp4'
import v3 from '../video/validate.mp4'
import v4 from '../video/validation.mp4'
import { motion } from "framer-motion";
function About1() {
  const text = "Description about our ANPR system"; // Change this to your heading
  const words = text.split(" ");
  return (
    <>
   <div className="flex items-center justify-center space-x-16 ">
      {/* Left Side - Larger Image */}
      <img
        src="./Images/About.jpg"
        className="w-[500px] h-[500px] object-cover rounded-lg shadow-2xl transition-transform transform hover:scale-105 hover:shadow-lg"
        alt="ANPR System"
      />

      {/* Right Side - Larger Content Section */}
      <div className="text-xl font-bold text-gray-300 mb-10">
        {/* Heading */}
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
          >
            {word}
          </motion.span>
        ))}

        {/* Paragraph */}
        <p className="text-xl text-gray-300 mt-10">
          An ANPR system enables you to analyze a car image and extract its relevant details.
        </p>

        {/* Square Grid Container */}
        <div className="grid grid-cols-2 gap-6 mt-10">
          <div className="bg-blend-color text-red-400 p-8 text-center font-semibold rounded-lg shadow-lg shadow-blue-500 transition-transform transform hover:scale-105 hover:shadow-lg hover:text-blue-400">
           <FaCar/>
            <p>Detects License Plates</p>
          </div>
          <div className="bg-blend-color p-8 text-red-400 text-center font-semibold rounded-lg shadow-lg shadow-blue-500 transition-transform transform hover:scale-105 hover:shadow-lg hover:text-blue-400">
          <FaReply/>
            <p>Extracts Characters</p>
          </div>
          <div className="bg-blend-color p-8  text-red-400 text-center font-semibold rounded-lg shadow-lg shadow-blue-500 transition-transform transform hover:scale-105 hover:shadow-lg hover:text-blue-400">
          <MdOutlineManageSearch/>
            <p>Validates Numbers</p>
          </div>
          <div className="bg-blend-color text-red-400 p-8 text-center font-semibold rounded-lg shadow-lg shadow-blue-500 transition-transform transform hover:scale-105 hover:shadow-lg hover:text-blue-400">
          <IoIosDocument/>
            <p>Fetches Vehicle Details</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default About1
