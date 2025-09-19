import React, { useState , useEffect } from "react";
import axios from "axios";
import video1 from '../video/carvedio2.mp4'
import video2 from '../video/vediocar1.mp4'
import { FaCar } from "react-icons/fa";
import { FaReply } from "react-icons/fa";
import { MdOutlineManageSearch } from "react-icons/md";
import { IoIosDocument } from "react-icons/io";
import v1 from '../video/vediocar1.mp4'
import v2 from '../video/numbervedio.mp4'
import v3 from '../video/validate.mp4'
import v4 from '../video/validation.mp4'
function Home1() {
  // const [option, setOption] = useState("");
  const [file,setFile] = useState(null);
  // const [imageURL,setImageURL] = useState(null);
  const [plateData,setPlateData] = useState(null);
  const [loading,setLoading] = useState(false);
  // useEffect(()=>{
  //   fetchData();
  // },[])
  // const fetchData = async ()=>{
  //   try{
  //     const response = await fetch('http://127.0.0.1:5000/api/data')
  //     const jsonData = await response.json();
  //     setData(jsonData)
  //   } catch(error){
  //     console.log('error',error)
  //   }
  // }
  // function handleOptionChange(e) {
  //   const selectedOption = e.target.value;
  //   setOption(selectedOption);

  //   if (selectedOption === "upload") {
  //     document.getElementById("fileInput").click();
  //   }
  // }

  // function handleImage(e) {
  //   const file = e.target.files[0];
  //   if (file) {
  //     console.log("Uploaded file:", file);
  //   }
  // }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    if(!file){
      alert('please select your image');
      return;
    }
    const formData = new FormData();
    formData.append('image',file);
    setLoading(true);
    setPlateData(null);
    // setTimeout(()=>{
    //   setPlateData(response.data);
    // },100);
    try {
      const response = await axios.post("http://127.0.0.1:5000/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      setPlateData(response.data);
      // alert("file uploaded succesfully and processed");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <div className="flex flex-col items-center mt-6 lg:mt-20">
    <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide text-amber-600">
    ANPR SYSTEM
    </h1>
    <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
    Automatic Number Plate Recognition and Authentication
    </p>

      <div className="flex justify-center my-5 border h-30 w-100  border-blue-500 items-center">
        <form onSubmit={handleSubmit}>
        {/* <select
          className="px-4 py-2 border border-blue-500 rounded-lg bg-black text-white shadow-lg shadow-blue-500/50 focus:ring-blue-500"
          onChange={handleOptionChange}
        >
          <option value="">Select an option</option>
          <option value="upload">Upload Image from File</option>
          <option value="webcam">Take Image from Webcam</option>
        </select> */}
        <input
        type="file"
        id="fileInput"
        accept="image/*"
        className="hidden"
        onChange={(e)=>setFile(e.target.files[0])}
       />
       <label
        htmlFor="fileInput"
        className="cursor-pointer bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700"
      >
        {file?file.name:"choose File"}
      </label>
        <button type="submit" disabled={loading} className="ml-4 px-6 py-3 bg-amber-600 text-white border-2 border-transparent rounded-2xl shadow-md transition-transform transform hover:scale-95 hover:shadow-lg hover:border-blue-500 hover:ring-2 hover:ring-blue-500 focus:outline-none">
        {loading? "Processing...":"Upload and Detect"}
      </button>
      </form>
      </div>
      <div className="border-2 border-gray-500 p-4 rounded-lg shadow-md bg-blend-color w-full max-w-xl mx-auto">
       {loading ? (
          <p className="text-lg text-center">Processing...</p>
        ) : (
          plateData && (
            <div>
              <h1 className="text-2xl font-bold mb-4 text-center">Processed Data</h1>
              <h3 className="text-xl font-semibold">Detected License Plate:</h3>
              <div className="border-2 border-gray-400 p-4 ml-12 rounded-md inline-block">
              <img src={`${plateData.image_url}?t=${new Date().getTime()}`} className="w-100 h-100" alt="Processed" />
              </div>
              <p className="text-lg mt-2"><strong>Plate Number:</strong> {plateData.results}</p>
              {plateData.owner_details && typeof plateData.owner_details === 'object' ? (
                <div  className="mt-4">
                  <h3 className="text-xl font-semibold">Owner Details:</h3>
                  <p className="text-lg"><strong>Name:</strong> {plateData.owner_details.owner_name}</p>
                  <p className="text-lg"><strong>Address:</strong> {plateData.owner_details.address}</p>
                  <p className="text-lg"><strong>Phone Number:</strong> {plateData.owner_details.phone_number}</p>
                </div>
              ) : (
                <p className="text-lg"><strong>Owner Details:</strong> {plateData.owner_details}</p>
              )}
            </div>
          )
        )}
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>       
    </>
  );
}

export default Home1;
