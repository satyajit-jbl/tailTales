import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
import usePet from '../../hooks/usePet';
import PetCard from '../../Components/petCard/petCard';
import { section } from 'framer-motion/client';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { FaSearch } from 'react-icons/fa';

const PetListing = () => {
  const [pet] = usePet();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  // sorting done in frontend, sorting by date done in backend
  const filteredPets = pet.filter(item => {
    const matchesName = item.name.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    return matchesName && matchesCategory && item.adopted === false;
  });

  return (
    <section>
      <SectionTitle
      heading={"Meet Your New Best Friend"}
      subHeading={"Discover Loving Pets Ready to Join Your Family"}
      >

      </SectionTitle>
      <div className="min-h-screen">
        <Helmet>
          <title>TailTales - Pet Listing</title>
        </Helmet>
        <div className="w-full max-w-screen-xl mx-auto p-4">
          <div className="relative flex flex-col md:flex-row gap-4 mb-10 justify-center">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow pl-10 p-2 border border-gray-300 rounded"
            />
            <FaSearch className="absolute left-3 w-5 h-9 text-gray-500"></FaSearch>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All Categories</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Reptile">Reptile</option>
              <option value="Other">Other</option>
              {/* <option value="Snake">Snake</option> */}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPets.map(item => (
              <PetCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetListing;
