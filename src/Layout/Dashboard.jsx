// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="bg-[#ECA427] text-white h-screen w-64 flex flex-col">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <span className="text-xl font-bold">Dashboard</span>
      </div>
      <nav className="mt-4 flex-1">
        <Link to="/dashboard" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
          Dashboard
        </Link>
        <Link to="/AddPet" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
          Add a Pet
        </Link>
        <Link to="/my-added-pets" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
          My Added Pets
        </Link>
        <Link to="/adoption-requests" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
          Adoption Requests
        </Link>
        <Link to="/create-donation-campaign" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
          Create Donation Campaign
        </Link>
        <Link to="/my-donation-campaigns" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
          My Donation Campaigns
        </Link>
        <Link to="/my-donations" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
          My Donations
        </Link>
      </nav>
    </div>
  );
};

export default Dashboard;
