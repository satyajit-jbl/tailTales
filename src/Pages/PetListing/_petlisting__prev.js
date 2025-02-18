import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
import usePet from '../../hooks/usePet';
import PetCard from '../../Components/petCard/petCard';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { FaSearch } from 'react-icons/fa';

const PetListing = () => {
  const [pet] = usePet();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 9; // Number of pets per page

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredPets = pet.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    return matchesName && matchesCategory && item.adopted === false;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPets.length / petsPerPage);
  const startIndex = (currentPage - 1) * petsPerPage;
  const endIndex = startIndex + petsPerPage;
  const currentPets = filteredPets.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="dark:bg-gray-800 dark:text-white">
      <SectionTitle
        heading={"Meet Your New Best Friend"}
        subHeading={"Discover Loving Pets Ready to Join Your Family"}
      ></SectionTitle>
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
              className="flex-grow pl-10 p-2 border border-gray-300 rounded dark:text-black"
            />
            <FaSearch className="absolute left-3 w-5 h-9 text-gray-500"></FaSearch>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-2 border border-gray-300 rounded dark:text-black"
            >
              <option value="">All Categories</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Reptile">Reptile</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentPets.map((item) => (
              <PetCard key={item._id} item={item} />
            ))}
          </div>
          {/* Pagination controls */}
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === page + 1
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'
                }`}
              >
                {page + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetListing;
