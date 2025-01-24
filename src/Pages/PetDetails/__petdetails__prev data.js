import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure, { axiosSecure } from '../../hooks/useAxiosSecure';

const PetDetails = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    // console.log(id);
    const {data: petdetails=[], isloading, refetch} = useQuery({
        queryKey: ['pet', id],
        queryFn: async ()=>{
            const {data} = await axiosSecure.get(`/pets/${id}`)
            return data
        }
        
    })
    // console.log(petdetails);
    return (
        <div className='min-h-screen'>
            
        </div>
    );
};

export default PetDetails;