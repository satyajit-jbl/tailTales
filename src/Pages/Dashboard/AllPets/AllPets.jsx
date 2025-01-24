import React from 'react';
import usePet from '../../../hooks/usePet';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEdit, FaPaw, FaTrash } from 'react-icons/fa';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AllPets = () => {
    const [pet, ,refetch] = usePet();
    const axiosSecure = useAxiosSecure();

     const handleAdoptedPet = async (id) => {
            try {
                const response = await axiosSecure.patch(`/pets/${id}`, { adopted: true });
                if (response.data.modifiedCount > 0) {
                    refetch(); 
                    Swal.fire({
                        title: "Success!",
                        text: "Pet marked as adopted.",
                        icon: "success"
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update pet status.",
                    icon: "error"
                });
            }
        };

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
        <section>
            <SectionTitle
            heading={"Available Pets for Adoption"}
            subHeading={"Explore all the pets currently looking for their forever homes"}
            ></SectionTitle>
           
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                               #
                            </th>
                            <th>Pet Details</th>
                            <th>Other Pet Info</th>
                            <th>Adoption Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pet.map((item, index)=><tr key={item._id}>
                                <th>
                                    {index+1}
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
                                        <div>
                                            <div className="font-bold">{item.name}</div>
                                            <div className="text-sm opacity-50">{item.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Age: {item.age}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{item.location}</span>
                                </td>
                                <td>{item.adopted ? 'Adopted' : 'Available for Adoption'}</td>
                                <th>
                                    {/* <button onClick={() => handleUpdatePet(item._id)} className="btn btn-ghost btn-lg"><FaEdit className='text-2xl text-blue-600'></FaEdit></button> */}
                                    <Link to={`/dashboard/updatePet/${item._id}`}>
                                        <button className="btn btn-ghost btn-lg">
                                            <FaEdit className="text-2xl text-blue-600" />
                                        </button>
                                    </Link>
                                    <button onClick={() => handleAdoptedPet(item._id)} className="btn btn-ghost btn-lg">
                                     <FaPaw className='text-2xl text-green-600' /></button>
                                     <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg"><FaTrash className='text-red-500 text-xl'></FaTrash></button>
                                </th>
                            </tr>  )
                        }
                        
                                             
                        
                    </tbody>
                   
                    
                </table>
            </div>

        </section>
    );
};

export default AllPets;