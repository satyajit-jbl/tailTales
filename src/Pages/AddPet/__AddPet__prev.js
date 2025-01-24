import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
// import axios from 'axios';
// import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { axiosSecure } from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPet = () => {
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();

    const [imageUrl, setImageUrl] = useState('');
    //   const {user} = useAuth();
    const { user } = useContext(AuthContext);
    // console.log(user);

    const categories = [
        { value: 'Dog', label: 'Dog' },
        { value: 'Cat', label: 'Cat' },
        { value: 'Bird', label: 'Bird' },
        { value: 'Reptile', label: 'Reptile' },
        { value: 'Other', label: 'Other' }
    ];

    const onSubmit = async (data) => {
        // console.log(data);
        try {
            const newPet = {
                ...data,
                imageUrl,
                category: data.category.value,
                dateAdded: new Date().toISOString(),
                adopted: false,
                user: user?.displayName,
                email: user?.email
            };

            // Save newPet to the database (replace with your API endpoint)
            await axiosPublic.post('/pets', newPet);
            // alert('Pet added successfully!');
            Swal.fire({
                title: "Pet added successfully!",
                icon: "success",
                draggable: true
              });
        } catch (error) {
            console.error('Error adding pet:', error);
        }
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await axiosPublic.post(image_hosting_api, formData);
            setImageUrl(res.data.data.url);
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };

    return (
        <section>
            <SectionTitle
            heading={"Add a Pet"}
            subHeading={"Add your desired [pet for adoption"}>
            </SectionTitle>
            <div className="max-w-4xl mx-auto p-8">
                {/* <h1 className="text-2xl font-bold mb-4">Add a Pet</h1> */}
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="space-y-6">
                        
                        {/* NAME */}
                        <div>
                            <label className="block mb-2">Pet Name</label>
                            <input
                                type="text"
                                {...register('name', { required: 'Pet name is required' })}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>
                        {/* AGE */}
                        <div>
                            <label className="block mb-2">Pet Age</label>
                            <input
                                type="number"
                                {...register('age', {
                                    required: 'Pet age is required',
                                    validate: value => value >= 0 || 'Age must be non-negative'
                                })}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
                        </div>
                        {/* CATEGORY */}
                        {/* <div>
            <label className="block mb-2">Pet Category</label>
            <Select 
              options={categories} 
              {...register('category', { required: 'Pet category is required' })} 
            //   {...register('category')} 
            />
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          </div> */}
                        <div>
                            <label className="block mb-2">Pet Category</label>
                            <Controller
                                name="category"
                                control={control}
                                defaultValue={null}
                                rules={{ required: 'Category is required' }}
                                render={({ field }) => <Select {...field} options={categories} />}
                            />
                            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                        </div>
                        {/* LOCATION */}
                        <div>
                            <label className="block mb-2">Pet Location</label>
                            <input
                                type="text"
                                {...register('location', { required: 'Pet location is required' })}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                        </div>
                        {/* IMAGE */}
                        <div>
                            <label className="block mb-2">Pet Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="block w-full"
                                onChange={(e) => handleImageUpload(e.target.files[0])}
                            />
                            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                        </div>

                    </div>

                    <div className="space-y-6">
                        {/* SHORT DESCRIPTION */}
                        <div>
                            <label className="block mb-2">Short Description</label>
                            <input
                                type="text"
                                {...register('shortDescription', { required: 'Short description is required' })}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.shortDescription && <p className="text-red-500">{errors.shortDescription.message}</p>}
                        </div>

                        <div>
                            {/* LONG DESCRIPTION */}
                            <label className="block mb-2">Long Description</label>
                            <textarea
                                {...register('longDescription', { required: 'Long description is required' })}
                                className="block w-full p-2 border border-gray-300 rounded h-32"
                            />
                            {errors.longDescription && <p className="text-red-500">{errors.longDescription.message}</p>}
                        </div>
                    </div>

                    <div className="col-span-full">
                        <button type="submit" className="bg-[#FF921C] text-white p-2 rounded w-full">Submit</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddPet;
