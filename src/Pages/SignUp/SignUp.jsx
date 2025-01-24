import React, { useContext, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../providers/AuthProvider';
import { Result } from 'postcss';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
// import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { AuthContext } from '../../provider/AuthProvider';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import SignupAnimation from '../../assets/signup-animation.json'
// import SignupAnimation2 from '../../assets/Signup-Animation2.json'
import Lottie from 'lottie-react';

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;



const SignUp = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const [imageUrl, setImageUrl] = useState('');
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const navigate = useNavigate();


    const onSubmit = (data) => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user
                // console.log(loggedUser);
                // updateUserProfile(data.name, data.photoURL)
                updateUserProfile(data.name, imageUrl)
                    .then(() => {
                        // create user entry in the db
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            // photo: result.user?.photoURL,
                            photo: imageUrl,
                            role: 'user'
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    // console.log('user id saves in databaSE', userInfo);
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Sign Up Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })

                    })
                    .catch(error => console.log(error));
            })
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


    return (
        <>
            {/* <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet> */}
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl text-center font-bold text-[#FF921C]">Sign Up now!</h1>
                        {/* <Lottie animationData={SignupAnimation2}></Lottie> */}
                        <Lottie animationData={SignupAnimation}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' {...register("name", { required: true })} placeholder="Your Name" className="input input-bordered" />
                                {errors.name && <span className='text-red-600'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                {/* <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                               
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="block w-full"
                                    onChange={(e) => handleImageUpload(e.target.files[0])}
                                />
                                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                                <div className='flex justify-center'><img src={imageUrl} className='h-16 w-16 rounded-full' alt="" /></div> */}
                                <div className='flex items-center'>
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Photo URL</span>
                                        </label>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="block w-full"
                                            onChange={(e) => handleImageUpload(e.target.files[0])}
                                        />
                                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                                    </div>
                                    <div className=''><img src={imageUrl} className='h-16 w-16 rounded-full' alt="" /></div>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*()_+\-=[\]{};':"\\|,.<>/?])/
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && (
                                    <p className='text-red-600'>Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className='text-red-600'>Password must be 6 characters</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className='text-red-600'>Password must be less then 20 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className='text-red-600'>Password must include at least one uppercase letter, one lowercase letter, one number, and one special character</p>
                                )}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary bg-[#FF921C]" type="submit" value="Sign Up" />

                            </div>
                        </form>
                        <div>
                            <p className='text-center mb-5'><small>Already have account ? <Link to="/login">Login</Link></small></p>
                        </div>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;