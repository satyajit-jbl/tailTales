// import React from 'react';
// import useAxiosSecure from './useAxiosSecure';
// import useAuth from './useAuth';
// import { useQuery } from '@tanstack/react-query';

// const useMyDonationAmt = () => {
//     const axiosSecure = useAxiosSecure();
//     const {user} = useAuth();

//     const {data: donationAmount=[], refetch} = useQuery({
//         queryKey: ['donationAmount'],
//         queryFn: async ()=>{
//             const res = await axiosSecure.get(`/donationAmt/users/${user?.email}`);
//             return res.send
//         }
//     });
//     return [donationAmount, refetch]
// };

// export default useMyDonationAmt;


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";



const useMyDonationAmt = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const{refetch, data: donationAmount=[]} = useQuery({
        queryKey:['donationAmount', user?.email],
        queryFn: async ()=>{
            // const res = await axiosSecure.get(`/pets/?email=${user.email}`)
            const res = await axiosSecure.get(`/donationAmt/users/${user.email}`)
            return res.data
        }
    })

    return [refetch, donationAmount]
};

export default useMyDonationAmt;