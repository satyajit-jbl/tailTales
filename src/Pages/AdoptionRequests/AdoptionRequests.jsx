import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

function AdoptionRequests() {
    const [requests, setRequests] = useState([]);
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();

    //   useEffect(() => {
    //     // fetch('https://12-b10-assignment-satyajit-server.vercel.app/adoption-requests')
    //     fetch(`https://12-b10-assignment-satyajit-server.vercel.app/adoption-requests/${user?.email}`)
    //       .then(response => response.json())
    //       .then(data => setRequests(data))
    //       .catch(error => console.error('Error fetching adoption requests:', error));
    //   }, []);

    useEffect(() => {
        const fetchRequests = async () => {
          try {
            // Use axios to fetch adoption requests for the logged-in user
            const response = await axiosPublic.get(`/adoption-requests/${user?.email}`);
            setRequests(response.data); // Set the fetched data to state
          } catch (error) {
            console.error('Error fetching adoption requests:', error);
          }
        };
    
        // Call the fetchRequests function
        if (user?.email) {
          fetchRequests();
        }
      }, [user?.email, axiosPublic]);
  

    const handleAccept = async (requestId) => {
        try {
          await axiosPublic.post(`/adoption-requests/${requestId}/accept`);
          setRequests(prevRequests => prevRequests.filter(request => request._id !== requestId));
        } catch (error) {
          console.error('Error accepting request:', error);
        }
      };

      const handleReject = async (requestId) => {
        try {
          await axiosPublic.post(`/adoption-requests/${requestId}/reject`);
          setRequests(prevRequests => prevRequests.filter(request => request._id !== requestId));
        } catch (error) {
          console.error('Error rejecting request:', error);
        }
      };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Adoption Requests</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4">Sl</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Phone</th>
                        <th className="py-2 px-4">Location</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests?.map((request, index) => (
                        <tr className='hover:bg-gray-200' key={request._id}>
                            <td className="py-2 px-4">{index+1}</td>
                            <td className="py-2 px-4">{request.userName}</td>
                            <td className="py-2 px-4">{request.userEmail}</td>
                            <td className="py-2 px-4">{request.phone}</td>
                            <td className="py-2 px-4">{request.address}</td>
                            <td className="py-2 px-4">
                                <button
                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => handleAccept(request._id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleReject(request._id)}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdoptionRequests;
