import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import { useQueries, useQuery } from '@tanstack/react-query';
import { Result } from 'postcss';
import Modal from 'react-modal';
import { loadStripe } from '@stripe/stripe-js';

// ToDo Add publishable key
const stripePromise = loadStripe('')

const DonationDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: donation, isLoading, error } = useQuery({
        queryKey: ['donation', id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`donations/${id}`);
            return data;
        }
    });
    console.log(donation);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        phone: '',
        address: '',
      });

    const { _id,
        petname, maxDonation, lastDate, shortDescription, longDescription, imageUrl, dateCreated, email } = donation || {};
    
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
          };

        const handleFormSubmit = async (e) => {
            e.preventDefault();
        }


    return (
        <div>
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto my-8">
                {/* Pet Image */}
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <img src={imageUrl} alt={petname} className="w-full h-64 object-cover rounded-lg shadow-lg" />
                </div>

                {/* Pet Details */}
                <div className="w-full md:w-2/3 md:pl-6 flex flex-col justify-between">
                    <h2 className="text-3xl font-semibold text-gray-800">{petname}</h2>
                    <p className="text-lg text-gray-600 mt-2">Max Donation: ${maxDonation}</p>
                    <p className="text-md text-gray-600">Last Donation Date: {lastDate}</p>
                    <p className="text-md text-gray-700 mt-4">{shortDescription}</p>
                    <p className="text-md text-gray-700 mt-2">{longDescription}</p>

                    {/* Donation Details */}
                    <div className="mt-6 flex items-center space-x-4">
                        <button
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                        // onClick={handleDonateNow}
                        >
                            Donate Now
                        </button>
                        <p className="text-sm text-gray-500">Date Created: {new Date(dateCreated).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">Contact: <a href={`mailto:${email}`} className="text-blue-500 hover:underline">{email}</a></p>
                    </div>
                </div>

            </div>
            

        </div>
    );
};

export default DonationDetails;

