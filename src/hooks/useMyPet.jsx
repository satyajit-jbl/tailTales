import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useMyPet = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const{refetch, data: myPet=[]} = useQuery({
        queryKey:['pet', user?.email],
        queryFn: async ()=>{
            // const res = await axiosSecure.get(`/pets/?email=${user.email}`)
            const res = await axiosSecure.get(`/pets/users/${user.email}`)
            return res.data
        }
    })

    return [refetch, myPet]
};

export default useMyPet;