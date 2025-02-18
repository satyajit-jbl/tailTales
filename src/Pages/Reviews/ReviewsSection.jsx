import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaQuoteLeft } from 'react-icons/fa';

const reviews = [
    {
        id: 1,
        name: 'Alice Johnson',
        review: 'Adopting from TailTales was a wonderful experience! The process was smooth.',
        image: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    {
        id: 2,
        name: 'Mark Wilson',
        review: 'I found my best friend through TailTales. Thank you for helping me adopt my adorable puppy!',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        id: 3,
        name: 'Sophia Martinez',
        review: 'The adoption process was seamless, and I loved how much the team cares about the animals.',
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
        id: 4,
        name: 'Daniel Lee',
        review: 'TailTales made it easy to find a loving pet. Highly recommended for animal lovers!',
        image: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
];

const ReviewsSection = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center text-yellow-500 mb-8">What Our Adopters Say</h2>

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 5000 }}
                loop
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review.id}>
                        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
                            <FaQuoteLeft className="text-4xl text-orange-400 mb-4" />
                            <p className="text-gray-700 mb-4">"{review.review}"</p>
                            <img
                                src={review.image}
                                alt={review.name}
                                className="w-20 h-20 rounded-full mb-4 border-4 border-yellow-400"
                            />
                            <h3 className="text-lg font-semibold text-orange-500">{review.name}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ReviewsSection;
