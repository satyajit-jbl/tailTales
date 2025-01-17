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

  //TODO: get isAdmin value form gthe datase
  const isAdmin = true;
  return (
    
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
