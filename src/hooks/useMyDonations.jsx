import { useQuery } from '@tanstack/react-query';
// import { axiosPublic } from './useAxiosPublic';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useMyDonations = () => {
    const {user} =useAuth();
    const axiosSecure=useAxiosSecure();

    const {data: MydonationsCamp=[], isPending: loading, refetch} = useQuery({
        queryKey: ['MydonationsCamp', user?.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/donations/users/${user?.email}`);
            return res.data;
            
        }
        
    })
    
    return [MydonationsCamp, loading, refetch]
};

export default useMyDonations;