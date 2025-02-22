import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import 'react-quill/dist/quill.snow.css';
import { useLoaderData } from 'react-router-dom';

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const UpdateMyDonationCampaign = () => {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm(); // Destructure watch and setValue
    const {petname, maxDonation, lastDate, shortDescription, longDescription, _id} = useLoaderData();

    const axiosPublic = useAxiosPublic();
    const [imageUrl, setImageUrl] = useState('');

    useEffect(()=>{
        setValue('longDescription', longDescription) 
    }, [longDescription, setValue])
   

    const onSubmit = async (data) => {
        try {
            const newCampaign = {
                ...data,
                maxDonation: Number(data.maxDonation),
                imageUrl,
                // dateCreated: new Date().toISOString(),
                
                // currentAmount: 0,
                // isPaused: false
            };

            await axiosPublic.patch(`/donations/update/${_id}`, newCampaign);
            // console.log(newCampaign);
            alert('Donation campaign Updated Successfully!');
        } catch (error) {
            console.error('Error creating donation campaign:', error);
        }
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await axiosPublic.post(imageHostingApi, formData);
            setImageUrl(res.data.data.url);
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };

    const handleEditorChange = (value) => {
        setValue('longDescription', value); // Set value for long description
    };

    return (
        <section>
        <SectionTitle heading={"Update Donation Campaign"} subHeading={"Update your Donation Campaign if there's any change"} />
        <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Pet Picture */}
                    <div>
                        <label className="block mb-2 text-sm sm:text-base">Pet Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full"
                            onChange={(e) => handleImageUpload(e.target.files[0])}
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                    </div>

                    {/* Pet Name */}
                    <div>
                        <label className="block mb-2 text-sm sm:text-base">Pet Name</label>
                        <input
                            type="text"
                            defaultValue={petname}
                            {...register('petname', { required: 'Pet name is required' })}
                            className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF921C]"
                        />
                        {errors.petname && <p className="text-red-500 text-sm mt-1">{errors.petname.message}</p>}
                    </div>

                    {/* Maximum Donation Amount */}
                    <div>
                        <label className="block mb-2 text-sm sm:text-base">Maximum Donation Amount</label>
                        <input
                            type="number"
                            defaultValue={maxDonation}
                            {...register('maxDonation', { required: 'Maximum donation amount is required' })}
                            className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF921C]"
                        />
                        {errors.maxDonation && <p className="text-red-500 text-sm mt-1">{errors.maxDonation.message}</p>}
                    </div>

                    {/* Last Date of Donation */}
                    <div>
                        <label className="block mb-2 text-sm sm:text-base">Last Date of Donation</label>
                        <input
                            type="date"
                            defaultValue={lastDate}
                            {...register('lastDate', {
                                required: 'Last date is required',
                                validate: {
                                    isFutureDate: (value) => {
                                        const currentDate = new Date();
                                        const selectedDate = new Date(value);
                                        return selectedDate > currentDate || 'The date must be in the future';
                                    }
                                }
                            })}
                            className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF921C]"
                        />
                        {errors.lastDate && <p className="text-red-500 text-sm mt-1">{errors.lastDate.message}</p>}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    

                    {/* Short Description */}
                    <div>
                        <label className="block mb-2 text-sm sm:text-base">Short Description</label>
                        <input
                            type="text"
                            defaultValue={shortDescription}
                            {...register('shortDescription', { required: 'Short description is required' })}
                            className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF921C]"
                        />
                        {errors.shortDescription && <p className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</p>}
                    </div>

                    {/* Long Description */}
                    <div className=' h-48 '>
                        <label className="block mb-2 text-sm sm:text-base">Long Description</label>
                        <ReactQuill
                            value={watch('longDescription')}
                            onChange={handleEditorChange}
                            modules={{
                                toolbar: [
                                    [{ header: '1' }, { header: '2' }],
                                    ['bold', 'italic', 'underline'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'image']
                                ]
                            }}
                            className="block w-full p-1 border border-gray-300 rounded h-32 focus:outline-none focus:ring-2 focus:ring-[#FF921C]"
                        />
                        {errors.longDescription && <p className="text-red-500 text-sm mt-1">{errors.longDescription.message}</p>}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-full">
                    <button type="submit" className="bg-[#FF921C] text-white py-3 px-6 rounded-full w-full hover:bg-[#ff7a00] transition duration-300">
                        Update Donation
                    </button>
                </div>
            </form>
        </div>
    </section>
    );
};

export default UpdateMyDonationCampaign;