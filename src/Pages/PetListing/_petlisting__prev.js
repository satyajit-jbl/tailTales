import { Helmet } from 'react-helmet-async';
import React from 'react';
import usePet from '../../hooks/usePet';
import PetCard from '../../Components/petCard/petCard';

const PetListing = () => {
  const [pet] = usePet();
  const adopPet = pet.filter(item => item.adopted === false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
      <Helmet>
        <title>TailTales - Pet Listing</title>
      </Helmet>
      {adopPet.map(item => (
        <PetCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default PetListing;
