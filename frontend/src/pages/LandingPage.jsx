import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">
          School Manager
        </h1>

        <div className="space-x-6 flex items-center">
          <a href="/login" className="text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="/Register" className="text-gray-700 hover:text-blue-600">
            About
          </a>

          <Link to="/login">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Register
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl font-bold text-gray-800 max-w-3xl leading-tight">
          Make your work of managing students easier
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-xl">
          Manage students, assign tasks, and track progress — all in one place.
        </p>

        <div className="mt-8 space-x-4">
          <Link to="/register">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button className="px-6 py-3 border rounded-lg hover:bg-gray-100">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 px-10 pb-20">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">👨‍🎓 Student Management</h2>
          <p className="text-gray-600">
            Easily add, update, and manage student records.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">📝 Task Assignment</h2>
          <p className="text-gray-600">
            Assign homework and track completion status.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">🔐 Secure Access</h2>
          <p className="text-gray-600">
            Admin authentication ensures secure management.
          </p>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;