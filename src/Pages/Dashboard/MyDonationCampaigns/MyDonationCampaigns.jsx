
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useMyDonations from '../../../hooks/useMyDonations';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { axiosPublic } from '../../../hooks/useAxiosPublic';
import { caption } from 'framer-motion/client';

const MyDonationCampaigns = () => {
    const [MydonationsCamp, loading, refetch] = useMyDonations();
    const [donationCampaigns, setDonationCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    console.log(MydonationsCamp);
    const [_id] = MydonationsCamp;
    console.log(_id);
    // TO DO currentAmount have to set in db
    // done



    const handlePauseToggle = async (campaignId, isPaused) => {
        // const axiosPublic = useAxiosPublic(); // Use axios instance

        try {
            // API call to toggle pause status
            await axiosPublic.put(`/donation-campaigns/${campaignId}/pause`, { isPaused: !isPaused });

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


    const handleEdit = (campaignId) => {
        navigate(`/edit-donation/${campaignId}`);
    };

    // const handleViewDonators = (campaign) => {
    //     setSelectedCampaign(campaign);
    //     setIsModalOpen(true);
    // };
    const handleViewDonators = async (campaign) => {
        setSelectedCampaign(campaign);
        console.log(campaign);
        setIsModalOpen(true);

        try {
            // Fetch the donators for the selected campaign
            const response = await axiosPublic.get(`/donation-campaigns/${campaign._id}/donators`);

            // Assuming the donators data is in the 'donators' field in the response
            setSelectedCampaign(prevState => ({
                ...prevState,
                donators: response.data.donators
            }));
        } catch (error) {
            console.error('Error fetching donators:', error);
        }
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCampaign(null);
    };

    return (
        <section>
            <SectionTitle
                heading={"My Donation Campaign"}
                subHeading={"Every Paw Deserves a Chance: Support Our Mission to Find Loving Homes for Pets in Need"}
            ></SectionTitle>
            <div className="container mx-auto p-6">
                {/* <h2 className="text-2xl font-bold mb-4">My Donation Campaigns</h2> */}
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-3">Pet Name</th>
                            <th className="border border-gray-300 p-3">Max Donation Amount</th>
                            <th className="border border-gray-300 p-3">Donation Progress</th>
                            <th className="border border-gray-300 p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MydonationsCamp.map((campaign) => (
                            <tr key={campaign._id}>
                                <td className="border border-gray-300 p-3">{campaign.petname}</td>
                                <td className="border border-gray-300 p-3">${campaign.maxDonation}</td>
                                <td className="border border-gray-300 p-3">
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            className="bg-blue-500 h-4 rounded-full"
                                            style={{ width: `${(campaign.currentAmount / campaign.maxDonation) * 100}%` }}
                                        ></div>
                                    </div>
                                </td>
                                <td className="border border-gray-300 p-3 space-x-2">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        onClick={() => handleEdit(campaign._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={`${campaign.isPaused ? 'bg-green-500' : 'bg-red-500'
                                            } text-white px-4 py-2 rounded hover:${campaign.isPaused ? 'bg-green-700' : 'bg-red-700'
                                            }`}
                                        onClick={() => handlePauseToggle(campaign._id, campaign.isPaused)}
                                    >
                                        {campaign.isPaused ? 'Unpause' : 'Pause'}
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                        onClick={() => handleViewDonators(campaign)}
                                    >
                                        View Donators
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
                                {selectedCampaign.donators?.map((donator, index) => (
                                    <li key={index} className="border-b border-gray-300 pb-2">
                                        <p><strong>Email:</strong> {donator.email}</p>
                                        <p><strong>Amount:</strong> ${donator.donationAmount}</p>
                                        <p><strong>Transaction ID:</strong> {donator.transactionId}</p>
                                        <p><strong>Date:</strong> {new Date(donator.date).toLocaleString()}</p>
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
                {isModalOpen && selectedCampaign && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <h3 className="text-xl font-bold mb-4">Donators for - {selectedCampaign.petname}</h3>
                            {selectedCampaign.donators?.length > 0 ? (
                                <ul className="space-y-2">
                                    {selectedCampaign.donators.map((donator, index) => (
                                        <li key={index} className="border-b border-gray-300 pb-2">
                                            <p><strong>Email:</strong> {donator.email}</p>
                                            <p><strong>Amount:</strong> ${donator.donationAmount}</p>
                                            <p><strong>Transaction ID:</strong> {donator.transactionId}</p>
                                            <p><strong>Date:</strong> {new Date(donator.date).toLocaleString()}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500">No donators found for this campaign.</p>
                            )}
                            <button
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}


            </div>
        </section>
    );
};

export default MyDonationCampaigns;
