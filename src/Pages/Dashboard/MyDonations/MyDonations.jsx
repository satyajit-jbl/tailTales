import React from 'react';
import useMyDonationAmt from '../../../hooks/useMyDonationAmt';
// import useMyDonations from '../../../hooks/useMyDonations';
// import useMyPet from '../../../hooks/useMyPet';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const MyDonations = () => {
    const [refetch, donationAmount] = useMyDonationAmt();

    // console.log(donationAmount);

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
    
                    axiosSecure.delete(`/donationAmt/users/${id}`)
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
            heading={"My Donations Overview"}
            subHeading={"Track your contributions and view donation details in one place"}
            ></SectionTitle>
            
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                               #
                            </th>
                            <th>Pet image</th>
                            <th>Pet name</th>
                            <th>Donated Amount</th>
                            <th>Ask for Refund</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donationAmount.map((donation, index)=><tr key={donation._id}>
                                <th>
                                   {index+1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={donation.petImage}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        
                                    </div>
                                </td>
                                <td>
                                    {donation.petName}
                                    
                                </td>
                                <td>{donation.donationAmount}</td>
                                <th>
                                    <button onClick={() => handleDelete(donation._id)} className="btn btn-ghost btn-lg"><FaTrash className='text-red-500 text-xl'></FaTrash></button>
                                </th>
                            </tr>)
                        }
                        

                    </tbody>

                </table>
            </div>

        </section>
    );
};

export default MyDonations;