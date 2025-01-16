import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import logoDog from '../../../assets/dog.png'
import logoList from '../../../assets/clist.png'
import logoFaq from '../../../assets/faq.png'

const AdoptionSection = () => {
    return (
        <section>
            <SectionTitle
            // heading={"About Us"}
            heading={
                <motion.h2
                    className="text-4xl font-semibold text-gray-800"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    PLANNING TO ADOPT A PET?
                </motion.h2>
            }
            subHeading={
                <motion.p
                    className="text-lg text-gray-600 mb-6"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2 }}
                >
                    Top tips for when you're planning to adopt
                </motion.p>
            }
            ></SectionTitle>
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
               
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center">
                        <div className="bg-purple-100 rounded-full p-6">
                            <img src={logoList} alt="Checklist Icon" className="h-20 w-20 text-purple-600" />
                        </div>
                        <h3 className="mt-6 text-lg font-medium text-purple-600">CHECKLIST FOR NEW ADOPTERS</h3>
                        <p className="mt-2 text-base text-gray-500">Make the adoption transition as smooth as possible.</p>
                        <a href="#" className="mt-4 px-6 py-2 text-purple-600 border border-purple-600 rounded-full hover:bg-purple-600 hover:text-white">LEARN MORE</a>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-purple-100 rounded-full p-6">
                            <img src={logoDog} alt="Dog Age Icon" className="h-20 w-20 text-purple-600" />
                        </div>
                        <h3 className="mt-6 text-lg font-medium text-purple-600">HOW OLD IS A DOG IN HUMAN YEARS?</h3>
                        <p className="mt-2 text-base text-gray-500">Learn to translate dog years to human years just for fun, and vice versa.</p>
                        <a href="#" className="mt-4 px-6 py-2 text-purple-600 border border-purple-600 rounded-full hover:bg-purple-600 hover:text-white">LEARN MORE</a>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-purple-100 rounded-full p-6">
                            <img src={logoFaq} alt="FAQ Icon" className="h-20 w-20 text-purple-600" />
                        </div>
                        <h3 className="mt-6 text-lg font-medium text-purple-600">PET ADOPTION FAQS</h3>
                        <p className="mt-2 text-base text-gray-500">Get answers to all the questions you haven’t thought of for your adoption.</p>
                        <a href="#" className="mt-4 px-6 py-2 text-purple-600 border border-purple-600 rounded-full hover:bg-purple-600 hover:text-white">LEARN MORE</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdoptionSection;
