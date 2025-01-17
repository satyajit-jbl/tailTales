import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const AdoptionArticleCard = ({ image, icon, title, description }) => (
    <div className="max-w-lg grid rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full" src={image} alt={title} />
        <div className="px-6 py-4 text-center">
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full border-4 border-white -mt-8 overflow-hidden">
                    <img src={icon} alt={title} />
                </div>
            </div>
            <h2 className="font-bold text-xl mb-2">{title}</h2>
            <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 py-4">
            <button className="w-full bg-[#FF921C] text-white font-bold py-2 px-4 rounded">
                Read More
            </button>
        </div>
    </div>
);

const AdoptionArticlesSection = () => {
    const articles = [
        {
            image: 'https://i.ibb.co.com/n1wtwj8/pet-5.jpg',
            icon: 'https://i.ibb.co.com/n1wtwj8/pet-5.jpg',
            title: 'Dog Adoption Articles',
            description: 'Learn more about caring for your new dog',
        },
        {
            image: 'https://i.ibb.co.com/n1wtwj8/pet-5.jpg',
            icon: 'https://i.ibb.co.com/n1wtwj8/pet-5.jpg',
            title: 'Cat Adoption Articles',
            description: 'Helpful insights on what to expect.',
        },
    ];

    return (
        <section>
            <SectionTitle
            heading={"Inspiring Tales and Expert Insights"}
            subHeading={"Explore heartwarming stories, expert advice, and the latest updates in the world of pet adoption. Stay informed and inspired with our curated articles."}
            >

            </SectionTitle>
            <div className="flex space-x-6 justify-center p-8">
                {articles.map((article, index) => (
                    <AdoptionArticleCard key={index} {...article} />
                ))}
            </div>
        </section>
    );
};

export default AdoptionArticlesSection;
