import Navbar from "./../Navbar/Navbar";
import React from "react";
import { Link } from "react-router-dom";

 function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo o nombre */}
        <h1 className="text-xl font-bold">Popcorn Studio</h1>

        <Navbar/>
      </div>
    </header>
  );
}

export default Header;