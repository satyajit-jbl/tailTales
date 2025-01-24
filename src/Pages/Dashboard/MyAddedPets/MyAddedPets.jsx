import React, { useState } from 'react';
import useMyPet from '../../../hooks/useMyPet';
import { FaEdit, FaPaw, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';

const MyAddedPets = () => {
    const [refetch, myPet] = useMyPet();
    const axiosSecure = useAxiosSecure();

    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 10;

    // Calculate the pagination data
    const totalPages = Math.ceil(myPet.length / petsPerPage);
    const startIndex = (currentPage - 1) * petsPerPage;
    const paginatedPets = myPet.slice(startIndex, startIndex + petsPerPage);

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
                    });
            }
        });
    };

    const handleAdoptedPet = async (id) => {
        try {
            const response = await axiosSecure.patch(`/pets/${id}`, { adopted: true });
            if (response.data.modifiedCount > 0) {
                refetch(); // Refresh the list after updating
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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section>
            <SectionTitle
                heading={"My Added Pets"}
                subHeading={"A Heartfelt Journey of Companionship and Care"}
            ></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Pet image</th>
                            <th>Pet Name</th>
                            <th>Pet category</th>
                            <th>Adoption Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedPets.map((item, index) => (
                            <tr key={item._id}>
                                <th>{startIndex + index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={item.imageUrl} alt="Pet" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.adopted ? "Adopted" : "Available for Adoption"}</td>
                                <td>
                                    <Link to={`/dashboard/updatePet/${item._id}`}>
                                        <button className="btn btn-ghost btn-lg">
                                            <FaEdit className="text-2xl text-orange-600" />
                                        </button>
                                    </Link>
                                    <button onClick={() => handleAdoptedPet(item._id)} className="btn btn-ghost btn-lg">
                                        <FaPaw className="text-2xl text-green-600" />
                                    </button>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg">
                                        <FaTrash className="text-red-500 text-xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <div className="btn-group">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`btn ${currentPage === i + 1 ? "btn-active" : ""}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default MyAddedPets;
