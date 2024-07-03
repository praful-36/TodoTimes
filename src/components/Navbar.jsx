import React from 'react';
import { Link } from 'react-router-dom';
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className={`flex justify-around py-2 items-center ${darkMode ? 'bg-gray-200 text-black ' : 'bg-gray-900 text-white'}`}>
      <div className="logo">
        <span className='text-sky-300 text-2xl font-bold'>TodoTimes</span>
      </div>

      <div className="right flex">
        <ul className='flex gap-5 items-center'>
          <li className='cursor-pointer'><Link to="/">Home</Link></li>
          <li className="nav-item m-1"><Link className="nav-link" to="/about">About</Link></li>
        </ul>
        <button onClick={toggleDarkMode} className='mx-3 px-3 py-2 text-xl bg-blue-500 text-white rounded'>
          {darkMode ? <CiLight /> : <MdDarkMode />}
        </button>
      </div>

    </nav>
  );
};

export default Navbar;
