// Sidebar.jsx
import { div } from 'framer-motion/client';
import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { FaDochub, FaDonate } from 'react-icons/fa';
import { MdOutlinePets } from 'react-icons/md';
import { RiHeartAdd2Line } from 'react-icons/ri';
import { SiPetsathome } from 'react-icons/si';
import { BiSolidDonateBlood, BiSolidDonateHeart } from 'react-icons/bi';
import { TbCamper } from 'react-icons/tb';
import useMyPet from '../hooks/useMyPet';

const Dashboard = () => {
  const [refetch, myPet] = useMyPet();
  console.log(myPet);
  return (
    // <div className="bg-[#ECA427] text-white h-screen w-64 flex flex-col">
    //   <div className="flex items-center justify-center h-16 border-b border-gray-700">
    //     <span className="text-xl font-bold">Dashboard</span>
    //   </div>
    //   {/* Dashboard side  bar */}
    //   <nav className="mt-4 flex-1">
    //     <Link to="/dashboard" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
    //       Dashboard
    //     </Link>
    //     <Link to="/dashboard/AddPet" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
    //       Add a Pet
    //     </Link>
    //     <Link to="/my-added-pets" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
    //       My Added Pets
    //     </Link>
    //     <Link to="/adoption-requests" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
    //       Adoption Requests
    //     </Link>
    //     <Link to="/create-donation-campaign" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
    //       Create Donation Campaign
    //     </Link>
    //     <Link to="/my-donation-campaigns" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
    //       My Donation Campaigns
    //     </Link>
    //     <Link to="/my-donations" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
    //       My Donations
    //     </Link>
    //   </nav>
    //   {/* Dashboard Content */}
    //   <div className='flex-1'>
    //     <Outlet></Outlet>
    //   </div>
    // </div>
    <div className='flex'>

      <div className='w-64 min-h-screen bg-orange-400'>

        <ul className='menu'>
          <li>
            <NavLink to='/dashboard/AddPet'>
              <RiHeartAdd2Line />
              Add Pet</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/myAddedPets'>
              <MdOutlinePets />
            My Added Pets ({myPet?.length})</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/adoptionRequest'>
            <SiPetsathome />
              Adoption Requests</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/donationCampaign'>
            <FaDonate></FaDonate>
            Create Donation Campaign</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/myDonationCampaigns'>
            <TbCamper />
            My Donation Campaigns</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/myDonationCampaigns'>
            <BiSolidDonateBlood />
            My Donations</NavLink>
          </li>
        </ul>
      </div>
      <div className='flex-1'>
        <Outlet></Outlet>
      </div>

    </div>

  );
};

export default Dashboard;
