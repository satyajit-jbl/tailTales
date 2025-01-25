
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useDonation from '../../hooks/useDonation';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { axiosPublic } from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllDonationCampaigns = () => {
    const [AlldonationsCamp, loading, refetch] = useDonation();
    const [donationCampaigns, setDonationCampaigns] = useState([]);
    // const [selectedCampaign, setSelectedCampaign] = useState(null);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    

   const handlePauseToggle = async (campaignId, isPaused) => {
           // const axiosPublic = useAxiosPublic(); // Use axios instance
   
           try {
               // API call to toggle pause status
               await axiosSecure.put(`/donation-campaigns/${campaignId}/pause`, { isPaused: !isPaused });
   
               // Update state to reflect new pause status
               setDonationCampaigns((prevCampaigns) =>
                   prevCampaigns.map((campaign) =>
                       campaign._id === campaignId ? { ...campaign, isPaused: !isPaused } : campaign
                   )
   
               );
               refetch();
           } catch (error) {
               console.error('Error toggling pause status:', error); // Log errors
           }
       };

      const handleDeleteDonation = id => {
        // console.log(id);
                  Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!"
                  }).then((result) => {
                      if (result.isConfirmed) {
          
                        axiosSecure.delete(`/donation-campaigns/${id}`)
                              .then(res => {
                                  if (res.data.deletedCount > 0) {
                                      refetch();
                                      Swal.fire({
                                          title: "Deleted!",
                                          text: "Your file has been deleted.",
                                          icon: "success"
                                      });
                                  }
                              })
                      }
                  });
              } 

   

    // const handleViewDonators = (campaign) => {
    //     setSelectedCampaign(campaign);
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => {
    //     setIsModalOpen(false);
    //     setSelectedCampaign(null);
    // };

    return (
        <section>
            <SectionTitle
            heading={"All Donation Campaign"}
            subHeading={"Every Paw Deserves a Chance: Support Our Mission to Find Loving Homes for Pets in Need"}
            ></SectionTitle>
            <div className="container mx-auto p-6">
            {/* <h2 className="text-2xl font-bold mb-4">My Donation Campaigns</h2> */}
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3">Sl</th>
                        <th className="border border-gray-300 p-3">Pet Name</th>
                        <th className="border border-gray-300 p-3">Max Donation Amount</th>
                        <th className="border border-gray-300 p-3">Donation Progress</th>
                        <th className="border border-gray-300 p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {AlldonationsCamp.map((campaign, index) => (
                        <tr key={campaign._id}>
                            <td className="border border-gray-300 p-3">{index+1}</td>
                            <td className="border border-gray-300 p-3">{campaign.petname}</td>
                            <td className="border border-gray-300 p-3">${campaign.maxDonation}</td>
                            <td className="border border-gray-300 p-3">
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className="bg-orange-500 h-4 rounded-full"
                                        style={{ width: `${(campaign.currentAmount / campaign.maxDonation) * 100}%` }}
                                    ></div>
                                </div>
                            </td>
                            <td className="border border-gray-300 p-3 space-x-2 flex justify-between">
                                
                                <Link to={`/dashboard/update-DonationCampaign/${campaign._id}`}>
                                    <button
                                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700"
                                        
                                    >
                                        Edit
                                    </button>
                                    </Link>
                                <button
                                    className={`${
                                        campaign.isPaused ? 'bg-green-500' : 'bg-red-500'
                                    } text-white px-4 py-2 rounded hover:${
                                        campaign.isPaused ? 'bg-green-700' : 'bg-red-700'
                                    }`}
                                    onClick={() => handlePauseToggle(campaign._id, campaign.isPaused)}
                                >
                                    {campaign.isPaused ? 'Unpause' : 'Pause'}
                                </button>
                                {/* <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                    onClick={() => handleViewDonators(campaign)}
                                >
                                    View Donators
                                </button> */}
                                <button
                                    className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                                    onClick={() => handleDeleteDonation(campaign._id)}
                                >
                                    Delete Campaign
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* {isModalOpen && selectedCampaign && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Donators for {selectedCampaign.petName}</h3>
                        <ul className="space-y-2">
                            {selectedCampaign.donators.map((donator, index) => (
                                <li key={index} className="border-b border-gray-300 pb-2">
                                    {donator.name}: ${donator.amount}
                                </li>
                            ))}
                        </ul>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )} */}
        </div>
        </section>
    );
};

export default AllDonationCampaigns;
