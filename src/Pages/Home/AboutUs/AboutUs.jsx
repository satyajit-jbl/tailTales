import { motion } from 'framer-motion';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const AboutUs = () => {

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-800 dark:text-white">
            <SectionTitle
            heading={"About Us"}
            subHeading={"Welcome to TailTales, a platform designed to help you find the perfect pet companion!"}
            ></SectionTitle>
            <div className="container mx-auto px-6 text-center ">

                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                    {/* Left Column - Text */}
                    <motion.div
                        className="text-left text-gray-600 dark:bg-gray-800 dark:text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4 }}
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                            How It Works
                        </h3>
                        <p className="mb-4">
                            At <span className='font-bold text-[#FF921C]'>TailTales</span>, we make it easy for you to search, connect with, and adopt pets in need.
                            Simply browse our collection of adorable animals, find your ideal match, and reach out to
                            the shelters to begin the adoption process. Whether you're looking for a dog, cat, or small animal,
                            we're here to help you find your new best friend!
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                            Why We Created This Website
                        </h3>
                        <p>
                            Our mission is to create a safe and easy platform for pet adoption. There are many animals
                            looking for loving homes, and we believe everyone should have access to the resources needed
                            to adopt responsibly. <span className='font-bold text-[#FF921C]'>TailTales</span> was created to bridge the gap between prospective pet owners
                            and shelters, ensuring pets find the homes they deserve.
                        </p>
                    </motion.div>

                    {/* Right Column - Images */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4 }}
                    >
                        <img
                            src="https://i.ibb.co.com/Cn048BN/pet-7.jpg"
                            alt="Happy Pet"
                            className="w-full md:w-3/4 lg:w-2/3 rounded-lg shadow-lg object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
