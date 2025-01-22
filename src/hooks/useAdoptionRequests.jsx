import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from './useAxiosSecure';
import useAxiosPublic from './useAxiosPublic';

const useAdoptionRequests = () => {
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth();

    const{refetch, data: adoptionRequest=[]} = useQuery({
        queryKey:['adoptionRequest', user?.email],
        queryFn: async ()=>{
            // const res = await axiosSecure.get(`/pets/?email=${user.email}`)
            const res = await axiosPublic.get(`/adopt/users/${user.email}`)
            return res.data
        }
    })

    return [refetch, adoptionRequest]
};

export default useAdoptionRequests;