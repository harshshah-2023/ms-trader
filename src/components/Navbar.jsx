import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between px-10 py-4 font-serif fixed ">
      {/* Logo */}

      <div className="navbarButtons flex space-x-10 text-2xl font-serif font-bold text-black">
        <Link to="/"><button className="hover:text-gray-300 cursor-pointer" >Home</button></Link>
        <Link to="/Contact"><button className="hover:text-gray-300 cursor-pointer">Contact</button></Link>
        <Link to="/aboutus"><button className="hover:text-gray-300 cursor-pointer">About Us</button></Link>
        <Link to="/Product"><button className="hover:text-gray-300 cursor-pointer">Products</button></Link>
        <Link to="/login"><button className="hover:text-gray-300 cursor-pointer">Login</button></Link>
      </div>




      <div className="logo">
        <Link to="/">
          <h1 className="text-4xl cursor-pointer text-white">Ms Traders</h1>
        </Link>
      </div>

      {/* Navigation Links */}
     
    </div>
  );
};

export default Navbar;
