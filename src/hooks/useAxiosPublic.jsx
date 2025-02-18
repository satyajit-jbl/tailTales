import axios from "axios";

export const axiosPublic = axios.create({
     baseURL: 'https://12-b10-assignment-satyajit-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;