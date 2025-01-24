import React, { useState, useEffect } from "react";
import usePet from "../../../hooks/usePet";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";


const PetListHome = () => {
  const [pet] = usePet(); // Get the pets array from the hook
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Extract unique categories from pets
    if (pet && pet.length > 0) {
      const uniqueCategories = [
        "All",
        ...new Set(pet.map((pet) => pet.category)),
      ];
      setCategories(uniqueCategories);
    }
  }, [pet]);

  // Filter pets based on selected category
  const filteredPets =
    selectedCategory === "All"
      ? pet.slice(0, 6) // Show the first 6 pets if "All" is selected
      : pet.filter((pet) => pet.category === selectedCategory).slice(0, 6);

  return (
    <div className="p-6 bg-yellow-50 dark:bg-gray-800 dark:text-white">
        <SectionTitle
        heading={"Find Your Perfect Pet"}
        subHeading={"Explore our listings of lovable pets ready for adoption."}
        ></SectionTitle>
      {/* <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Pet List</h2> */}
      <div className="mb-4 flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-yellow-200 text-orange-600 hover:bg-orange-400"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {filteredPets.map((pet) => (
          <div
            key={pet._id}
            className="border p-4 rounded shadow-lg hover:shadow-2xl transition"
          >
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="w-full h-80 object-cover rounded"
            />
            <h3 className="text-lg font-bold mt-2 text-orange-600">{pet.name}</h3>
            <p className="text-sm text-gray-700 dark:text-white">{pet.shortDescription}</p>
            {/* <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              View Details
            </button> */}
          </div>
        ))}
      </div>

      {/* All Listings Button Below the Pet Cards */}
      <div className="mt-6 text-center">
        <Link to={"/pet"}>
        <button
          onClick={() => setSelectedCategory("All")}
          className="px-6 py-3 mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all"
        >
          All Listings
        </button>
        </Link>
      </div>
    </div>
  );
};

export default PetListHome;
