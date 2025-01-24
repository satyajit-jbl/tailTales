import React from 'react';
import { motion } from 'framer-motion';
import petImage1 from '../../../assets/pet (1).jpg';
import petImage2 from '../../../assets/pet (2).jpg';
import petImage3 from '../../../assets/pet (3).jpg';
import petImage4 from '../../../assets/pet (4).jpg';
import petImage5 from '../../../assets/pet (5).jpg';
import petImage6 from '../../../assets/pet (6).jpg';
import petImage7 from '../../../assets/pet (7).jpg';
import { Link } from 'react-router-dom';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
// import petImage2 from '../assets/pet (2).jpg';  
// import petImage3 from '../assets/pet (3).jpg';  
// import petImage4 from '../assets/pet (4).jpg';  
// import petImage5 from '../assets/pet (5).jpg';  
// import petImage6 from '../assets/pet (6).jpg';  
// import petImage7 from '../assets/pet (7).jpg';  

const images = [petImage2, petImage3, petImage4, petImage5, petImage6, petImage7]; // Array for images

const CallToAction = () => {
  return (
    <section className='dark:bg-gray-800 dark:text-white'>
     
      <div className="relative bg-gray-50 py-16 overflow-hidden dark:bg-gray-800 dark:text-white">
      <SectionTitle
        heading={"Be a Hero – Change a Life"}
        subHeading={"Every pet deserves love and care. Your decision to adopt can give a homeless pet a brighter future. Make a difference today!"}
      ></SectionTitle>
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 flex flex-col md:flex-row-reverse items-center">
          {/* Animated Main Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative md:w-1/2 sm:w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r opacity-50 rounded-lg"></div>
            <div className='flex justify-center'>
              <img
                src={petImage1}
                alt="Adopt a pet"
                className="rounded-lg shadow-lg md:w-full lg:w-2/3 relative z-10"
              />
            </div>
          </motion.div>

          {/* Animated Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="md:w-1/2 text-center sm:text-center md:text-left z-20 mt-8 md:mt-0"
          >
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg md:ml-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Open Your Heart, <span className="text-[#FF921C]">Open Your Home</span>
              </h2>
              <h2 className='text-2xl text-[#FF921C] p-10'>"Give a Pet a Forever Home!"</h2>
              <p className="mt-4 text-gray-600 text-base sm:text-lg">
                Make a difference today by adopting a pet in need. Together, we
                can give them the loving homes they deserve.
              </p>
              <Link to="/pet">
                <button className="mt-6 px-6 py-3 bg-[#FF921C] text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                  Adopt Now
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Animated Group of Smaller Images */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="w-24 h-24 sm:w-32 sm:h-32 relative rounded-lg overflow-hidden shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={image}
                alt={`Pet ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
