import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-700 via-blue-600 to-teal-700 text-white py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        {/* Footer Brand */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-extrabold tracking-wider text-white">
            BlogVault
          </h2>
          <p className="text-gray-100 mt-2 text-sm md:text-base">
            Discover stories, insights, and experiences from around the world.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm font-medium text-gray-300 mt-4 md:mt-0">
          <Link to="/" className="hover:text-white transition duration-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-white transition duration-300">
            About
          </Link>
          <Link to="/blog" className="hover:text-white transition duration-300">
            Blog
          </Link>
          <Link
            to="/contact"
            className="hover:text-white transition duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-all duration-300 hover:scale-110"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition-all duration-300 hover:scale-110"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-all duration-300 hover:scale-110"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-all duration-300 hover:scale-110"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-600 mt-8 pt-4 text-center text-sm text-gray-300">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">BlogVault</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
