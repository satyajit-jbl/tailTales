import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
import usePet from '../../hooks/usePet';
import PetCard from '../../Components/petCard/petCard';

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
    <div className="min-h-screen">
      <Helmet>
        <title>TailTales - Pet Listing</title>
      </Helmet>
      <div className="w-full max-w-screen-xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-5 justify-center">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow p-2 border border-gray-300 rounded"
          />
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
  );
};

export default PetListing;
