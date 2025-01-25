import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../../../assets/LogoTail.svg';
import useAuth from '../../../hooks/useAuth';
import ThemeToggle from '../../../Components/ThemeToggle/ThemeToggle';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown menu

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#FF921C] text-white z-50 dark:bg-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              {/* <img className="h-16" src={logo2} alt="" /> */}
              <img className="h-16" src={logo2} alt="Logo" style={{ filter: 'brightness(0) invert(1)' }} />

            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="/pet" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Pet Listing
                </Link>
                <Link to="/donationCampaigns" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Donation Campaigns
                </Link>
                {/* <Link to="/secret" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Secret
                </Link> */}
                {user ? (
                  <>
                    {/* <span>{user?.email}</span> */}
                  </>
                ) : (
                  <>
                    <li style={{ listStyleType: "none" }}>
                      <Link to="/login">Login/Register</Link>
                    </li>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <div className="flex gap-10 items-center">
                  <div>
                    <ThemeToggle></ThemeToggle>
                  </div>
                  <button
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    onClick={toggleDropdown}
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.photoURL}
                      alt="Profile"
                    />
                  </button>
                </div>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef} // Attach reference to the dropdown
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    {user ? (
                      <button
                        onClick={() => handleLogout()}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Login/Register
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="/pet" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Pet Listing
            </Link>
            <Link to="/donationCampaigns" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Donation Campaigns
            </Link>
            <Link to="/login" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Login/Register
            </Link>
            <ThemeToggle></ThemeToggle>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
