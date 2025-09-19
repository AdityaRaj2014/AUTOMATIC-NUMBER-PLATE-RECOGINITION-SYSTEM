import React, { useState , useEffect } from 'react'
import axios from "axios";
function ContactUs1() {
  const[formData,setformData] = useState({name:"",email:"",message:""});
  const[responseMessage,setResponseMessage] = useState("");
  const handleChange = (e) => {
    setformData({...formData,[e.target.name]:e.target.value});
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await axios.post("http://127.0.0.1:5000/send-email", formData);
      setResponseMessage(response.data.message);
      setformData({name:"",email:"",message:""});
    }catch(error){
      setResponseMessage("Failed to send message.Try again later.");
    }
  }
    useEffect(() => {
      document.body.style.overflow = "hidden";
  
      return () => {
        document.body.style.overflow = "auto"; 
      };
    }, []);
  return (
    <div className="flex flex-col items-center justify-center bg-blend-color text-red-400 p-6">
    <h2 className="text-3xl font-bold mb-6 text-white">Contact Us</h2>

    <div className="max-w-md w-full p-6 rounded-lg shadow-lg shadow-blue-500 transition-transform transform hover:scale-105 hover:shadow-lg hover:text-blue-400">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            placeholder='enter your name'
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder='enter your email'
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            placeholder='enter your message'
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none h-24"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-600 hover:bg-blue-500 p-2 rounded text-white font-semibold"
        >
          Send Message
        </button>
      </form>
      
      {responseMessage && (
        <p className="mt-4 text-center text-green-400">{responseMessage}</p>
      )}
    </div>
  </div>
  )
}

export default ContactUs1