import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
        Go Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
