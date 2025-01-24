import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const AdoptionArticleCard = ({ image, icon, title, description }) => (
    <div className="w-full flex flex-col rounded overflow-hidden shadow-lg bg-white">
        {/* Card image */}
        <img
            className="w-full h-56 object-cover"
            src={image}
            alt={`${title} image`}
        />

        {/* Card content */}
        <div className="flex-grow px-6 py-4 text-center flex flex-col items-center">
            {/* Icon */}
            <div className="flex justify-center mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-white -mt-16 overflow-hidden">
                    <img
                        className="object-cover w-full h-full"
                        src={icon}
                        alt={`${title} icon`}
                    />
                </div>
            </div>
            {/* Title */}
            <h2 className="font-bold text-xl mb-2">{title}</h2>
            {/* Description */}
            <p className="text-gray-700 text-base">{description}</p>
        </div>

        {/* Button */}
        <div className="px-6 py-4 mt-auto">
            <button className="w-full bg-[#FF921C] text-white font-bold py-2 px-4 rounded">
                Read More
            </button>
        </div>
    </div>
);

const AdoptionArticlesSection = () => {
    const articles = [
        {
            image: 'https://i.ibb.co/n1wtwj8/pet-5.jpg',
            icon: 'https://i.ibb.co.com/xJqF58b/2018-11-Pet-Vet-Outdoor-155-Why-is-it-Important-to-Microchip-My-Pet-scaled.jpg',
            title: 'Dog Adoption Articles',
            description: 'Learn more about caring for your new dog.',
        },
        {
            image: 'https://i.ibb.co/d2F74pt/silver-tabby-cat-sitting-on-green-background-free-photo.jpg',
            icon: 'https://i.ibb.co.com/fnn4Cq9/images-2.jpg',
            title: 'Cat Adoption Articles',
            description: 'Helpful insights on what to expect.',
        },
        {
            image: 'https://i.ibb.co.com/FW7zzKM/sddefault.jpg',
            icon: 'https://i.ibb.co.com/1zz94kB/painted-turtle-on-table-1024x672.jpg',
            title: 'Pet Adoption Stories',
            description: 'Stories and expert advice for pet parents.',
        },
        {
            image: 'https://i.ibb.co.com/3f9Y1xL/istockphoto-544792030-612x612.jpg',
            icon: 'https://i.ibb.co.com/QD5LmVZ/Sub-page-banner-750-x-352-96.jpg',
            title: 'Adoption FAQs',
            description: 'Get answers to common adoption questions.',
        },
    ];

    return (
        <section className="dark:bg-gray-800 dark:text-white py-12">
            <SectionTitle
                heading="Inspiring Tales and Expert Insights"
                subHeading="Explore heartwarming stories, expert advice, and the latest updates in the world of pet adoption. Stay informed and inspired with our curated articles."
            />
            {/* Responsive grid for 4 cards */}
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {articles.map((article, index) => (
                    <AdoptionArticleCard key={index} {...article} />
                ))}
            </div>
        </section>
    );
};

export default AdoptionArticlesSection;
