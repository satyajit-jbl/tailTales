import React from 'react';
import usePet from '../../hooks/usePet';
import PetCard from '../../Components/petCard/petCard';


const PetListing = () => {
    const [pet] = usePet();
    const adopPet = pet.filter(item=>item.adopted === false);
    console.log(pet);
    console.log(adopPet);
    return (
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5'>
            {
                adopPet.map(item => <PetCard key={item._id} item={item}></PetCard>)
            }
        </div>
    );
};

export default PetListing;