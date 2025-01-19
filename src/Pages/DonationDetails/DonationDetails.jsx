import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Modal from 'react-modal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

// Set up Stripe
const stripePromise = loadStripe('your-publishable-key-here');

Modal.setAppElement('#root'); // Necessary for accessibility

const DonationDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [donationAmount, setDonationAmount] = useState(''); // State for donation amount
    

    const { data: donation, isLoading, error } = useQuery({
        queryKey: ['donation', id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`donations/${id}`);
            return data;
        }
    });

    const { petname, maxDonation, lastDate, shortDescription, longDescription, imageUrl, dateCreated, email } = donation || {};
    const isDonationClosed = new Date() > new Date(lastDate); // Check if the donation period is over

    const handleDonateNow = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAmountChange = (e) => {
        setDonationAmount(e.target.value);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto my-8">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <img src={imageUrl} alt={petname} className="w-full h-64 object-cover rounded-lg shadow-lg" />
                </div>

                <div className="w-full md:w-2/3 md:pl-6 flex flex-col justify-between">
                    <h2 className="text-3xl font-semibold text-gray-800">{petname}</h2>
                    <p className="text-lg text-gray-600 mt-2">Max Donation: ${maxDonation}</p>
                    <p className="text-md text-gray-600">Last Donation Date: {lastDate}</p>
                    <p className="text-md text-gray-700 mt-4">{shortDescription}</p>
                    <p className="text-md text-gray-700 mt-2">{longDescription}</p>

                    <div className="mt-6 flex items-center space-x-4">
                        {
                            !isDonationClosed ? 
                            <button
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                            // className={`${isDonationClosed ?'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200' }`}
                            onClick={handleDonateNow}
                        >
                            Donate Now
                        </button>
                        :
                        <button
                            className="bg-gray-500 text-white px-6 py-2 rounded-lg  transition duration-200"
                            // className={`${isDonationClosed ?'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200' }`}
                            
                        >
                            Donate Now
                        </button>
                        }
                        {/* <button
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                            // className={`${isDonationClosed ?'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200' }`}
                            onClick={handleDonateNow}
                        >
                            Donate Now
                        </button> */}
                        <p className="text-sm text-gray-500">Date Created: {new Date(dateCreated).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">Contact: <a href={`mailto:${email}`} className="text-blue-500 hover:underline">{email}</a></p>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Donation Modal"
            >
                <h2 className="text-xl">Complete Your Donation</h2>
                <input
                    type="number"
                    value={donationAmount}
                    onChange={handleAmountChange}
                    placeholder="Enter donation amount"
                    className="mt-4 p-2 border border-gray-300 rounded-lg w-full"
                />
                <Elements stripe={stripePromise}>
                    <CheckoutForm donationAmount={donationAmount} />
                </Elements>
                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
};

export default DonationDetails;
