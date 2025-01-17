import React from 'react';
import useMyPet from '../../../hooks/useMyPet';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure, { axiosSecure } from '../../../hooks/useAxiosSecure';

const MyAddedPets = () => {
    const [refetch, myPet] = useMyPet();
    const axiosSecure = useAxiosSecure();

    console.log(myPet);
    const handleDelete = id => {
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

                axiosSecure.delete(`/pets/${id}`)
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
        <div>
            <div>
                <h2 className='text-3xl'>Total Pets: {myPet.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                Sl
                            </th>
                            <th>Pet image</th>
                            <th>Pet Name</th>
                            <th>Pet category</th>
                            <th>Adoption Status</th>
                            <th>Action</th>

                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myPet.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.imageUrl}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>{item.category}</td>
                                <th>
                                    {item.adopted ? "Adopted" : "Available for Adoption"}
                                </th>
                                <th>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg"><FaTrash className='text-red-500'></FaTrash></button>
                                </th>
                            </tr>)
                        }




                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyAddedPets;
