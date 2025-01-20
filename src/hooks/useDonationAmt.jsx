// not using it now.............may be use later and need to rectify for id

// import { useQuery } from '@tanstack/react-query';
// import React from 'react';

// const useDonationAmt = () => {
//     const { data: donationByUser, isPending: loading, refetch } = useQuery({
//         queryKey: ['donationByUser', id],
//         queryFn: async () => {
//             const { data } = await axiosPublic.get(`donations/${id}`);
//             return data;
//         }
//     });
//     return [donationByUser, loading, refetch]
// };

// export default useDonationAmt;