import { useQuery } from '@tanstack/react-query';
import { axiosPublic } from './useAxiosPublic';

const useDonation = () => {
    const {data: AlldonationsCamp=[], isPending: loading, refetch} = useQuery({
        queryKey: ['AlldonationsCamp'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/donations');
            return res.data;
            
        }
        
    })
    
    return [AlldonationsCamp, loading, refetch]
};

export default useDonation;