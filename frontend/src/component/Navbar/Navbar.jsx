import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-amber-50 sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={'./Images/ANPRLOGO.jpg'}/>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
          <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-red-600 transition duration-300 ${
              isActive ? "text-black font-bold border-b-2 border-black" : "hover:text-black"
            }`
          }   
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/About1"
          className={({ isActive }) =>
            `text-red-600 transition duration-300 ${
              isActive ? "text-black font-bold border-b-2 border-black" : "hover:text-black"
            }`
          } 
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/WorkingDemo1"
          className={({ isActive }) =>
            `text-red-600 transition duration-300 ${
              isActive ? "text-black font-bold border-b-2 border-black" : "hover:text-black"
            }`
          } 
          
        >
          WorkingDemo
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contactUs1"
          className={({ isActive }) =>
            `text-red-600 transition duration-300 ${
              isActive ? "text-black font-bold border-b-2 border-black" : "hover:text-black"
            }`
          } 
        >
          ContactUs
        </NavLink>
      </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


