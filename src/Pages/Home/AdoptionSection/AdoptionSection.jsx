import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import logoDog from '../../../assets/dog.png';
import logoList from '../../../assets/clist.png';
import logoFaq from '../../../assets/faq.png';

const AdoptionSection = () => {
    const sections = [
        {
            id: 1,
            icon: logoList,
            title: 'CHECKLIST FOR NEW ADOPTERS',
            description: 'Make the adoption transition as smooth as possible.',
            link: '#',
        },
        {
            id: 2,
            icon: logoDog,
            title: 'HOW OLD IS A DOG IN HUMAN YEARS?',
            description: 'Learn to translate dog years to human years just for fun, and vice versa.',
            link: '#',
        },
        {
            id: 3,
            icon: logoFaq,
            title: 'PET ADOPTION FAQS',
            description: 'Get answers to all the questions you haven’t thought of for your adoption.',
            link: '#',
        },
    ];

    return (
        <section className="dark:bg-gray-800 dark:text-white">
            <SectionTitle
                heading="Planing To Adopt A Pet"
                subHeading="Top tips for when you're planning to adopt"
            />
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {sections.map((section) => (
                        <article
                            key={section.id}
                            className="flex flex-col items-center"
                        >
                            <div className="bg-purple-100 rounded-full p-6">
                                <img
                                    src={section.icon}
                                    alt={`${section.title} Icon`}
                                    className="h-20 w-20 aspect-square"
                                />
                            </div>
                            <h3 className="mt-6 text-lg font-medium text-purple-600">
                                {section.title}
                            </h3>
                            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                                {section.description}
                            </p>
                            <a
                                href={section.link}
                                className="mt-4 px-6 py-2 text-purple-600 border border-purple-600 rounded-full hover:bg-purple-600 hover:text-white active:bg-purple-800"
                            >
                                LEARN MORE
                            </a>
                        </article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AdoptionSection;
