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
    //     fetch('https://12-b10-assignment-satyajit-server.vercel.app/pets')
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
            // const res = await axios.get('https://12-b10-assignment-satyajit-server.vercel.app/pets');
            return res.data;
            // console.log(res.data);
        }
    })

    return [pet, loading, refetch];
};

export default usePet;