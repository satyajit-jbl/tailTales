import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaUser } from 'react-icons/fa';
import { section } from "framer-motion/client";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";


const Users = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }

    });
    console.log(users);

    const handleMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data);
            if(res.data.modifiedCount>0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is Admin Now`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleDeleteUser = user => {
        console.log(user);
        Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
        
                        axiosSecure.delete(`/users/${user._id}`)
                            .then(res => {
                                if (res.data.deletedCount > 0) {
                                    refetch();
                                      Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                      });
                                }
                            })
                    }
                });
    }
    return (
        <section>
            <Helmet>
                <title>tailTales - All Users</title>
            </Helmet>
            <SectionTitle
                heading={"List of All Users"}
                subHeading={`Total Users: ${users.length}`}

            ></SectionTitle>
            <div>
                {/* <div className='flex justify-between'>
                    <h2 className='text-2xl'>List of All Users</h2>
                    <h2 className='text-2xl'>Total Users: {users?.length}</h2>
                </div> */}
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.photo}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {user.name}
                                        <br />

                                    </td>
                                    <td>{user.email}</td>
                                    <th>
                                        {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-lg"><FaUser className='text-yellow-600 font-2xl'></FaUser></button>}
                                    </th>
                                    <th>
                                        <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg"><FaTrash className='text-red-500'></FaTrash></button>
                                    </th>
                                </tr>)
                            }


                        </tbody>

                    </table>
                </div>
            </div>
        </section>
    );
};

export default Users;