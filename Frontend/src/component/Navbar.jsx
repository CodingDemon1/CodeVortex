import React from 'react';
import image from "../assets/codev.png";
import './animations.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={image}
            alt="Logo"
            className="h-12 w-auto animate-pulse"
          />
        </div>
        <div className="flex items-center space-x-25">
          {/* Add your other navbar links or components here */}
          <div className="flex space-x-20">
            <Link
              to="/home"
              className="text-white hover:text-gray-300 font-semibold"
            >
              Home
            </Link>
            <Link
              to="/feedback"
              className="text-white hover:text-gray-300 font-semibold"
            >
              Feedback
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
