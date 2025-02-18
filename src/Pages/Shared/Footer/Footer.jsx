import React from 'react';
import logo from '../../../assets/LogoTail.svg'

const Footer = () => {
  return (
    <footer className="bg-[#FF921C] text-white py-8 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            <img
              src={logo}
              alt="TailTales Logo"
              className="w-32 h-32 mr-3"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <div>
              <h3 className="text-2xl font-bold">TailTales</h3>
              <p className="text-sm text-white mt-2">
                Connecting pets with loving homes.
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="/" className="text-white hover:text-red-500">
              Home
            </a>
            <a href="#about" className="text-white hover:text-red-500">
              About Us
            </a>
            <a href="/contact" className="text-white hover:text-red-500">
              Contact
            </a>
            <a href="/privacy" className="text-white hover:text-red-500">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-bold">Subscribe to Our Newsletter</h4>
              <p className="text-sm text-white">Get the latest updates and stories.</p>
            </div>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 placeholder-orange-600 py-2 rounded-md bg-white text-orange-600 focus:outline-none focus:ring focus:ring-orange-300"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-white text-orange-600 hover:bg-orange-700 hover:text-red-500 focus:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-6 border-t border-orange-500 pt-4">
          <p className="text-center text-sm text-white">
            &copy; {new Date().getFullYear()} TailTales. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
