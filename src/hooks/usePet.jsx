// import React, { useEffect, useState } from 'react';
// import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure, { axiosSecure } from './useAxiosSecure';
import { axiosPublic } from './useAxiosPublic';
// import axios from 'axios';

const usePet = () => {
    //  const [pet, setPet] = useState([]);
    // const [loading, setLoading]=useState(true);
    // useEffect(() => {
    //     fetch('http://localhost:5000/pets')
    //         .then(res => res.json())
    //         .then(data => {
    //             setPet(data);
    //             setLoading(false);
    //         });

    // }, [])

    const {data: pet = [],isPending: loading, refetch} = useQuery({
        queryKey: ['pet'],
        queryFn: async()=>{
            
            const res = await axiosSecure.get('/pets');
            // const res = await axiosPublic.get('/pets');
            // const res = await axios.get('http://localhost:5000/pets');
            return res.data;
            console.log(res.data);
        }
    })

    return [pet, loading, refetch];
};

export default usePet;