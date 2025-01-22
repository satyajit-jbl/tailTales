import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML
import React from 'react';
import { useNavigate, useNavigation, useParams } from 'react-router-dom'; // Assuming you're using React Router
import Modal from 'react-modal'; // Assuming you're using react-modal
import { useQuery } from '@tanstack/react-query';
// import useAxiosPublic from '../../hooks/useAxiosPublic'; // Import the axios hook
// import useAuth from '../../hooks/useAuth'; // Import the useAuth hook
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const PetDetails = () => {
  const { id } = useParams(); // Get pet ID from URL
  const axiosPublic = useAxiosPublic(); // Get axios instance
  const { user } = useAuth(); // Get user info from Auth context
  const navigate = useNavigate();
  // console.log(user);
  const { data: pet, isLoading, error } = useQuery({
    queryKey: ['pet', id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/pets/${id}`);
      return data;
    }
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    phone: '',
    address: '',
  });

  //   TODO: need to edit it next
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading pet details.</div>;

  // Destructure pet data
  const {
    _id,
    name,
    age,
    location,
    shortDescription,
    longDescription,
    category,
    imageUrl,
    dateAdded,
    adopted,
    user: petUser,
    email: petEmail
  } = pet || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdoptClick = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const adoptionData = {
      petId: _id,
      petName: name,
      petImage: imageUrl,
      userName: user.displayName,
      userEmail: user.email,
      phone: formData.phone,
      address: formData.address,
    };

    try {
      const response = await axiosPublic.post('/adopt', adoptionData);
      if (response.status === 200) {
        // alert('Adoption request submitted successfully!');
        Swal.fire({
          title: "Thanks",
          // text: `Your adoption request for <span style="color: green; font-weight: bold;">${name}</span> was sent successfully!`,
          html: `Your adoption request for <span style="color: blue; font-weight: bold;">${name}</span> was sent successfully!`,
          imageUrl: imageUrl,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image"
        });
        setIsModalOpen(false);
        navigate('/pet');
      } else {
        alert('Failed to submit adoption request.');
      }
    } catch (error) {
      alert('Error submitting adoption request.');
    }
  };

  return (
    <div className="pet-details">
      {/* <div>
        <img src={imageUrl || 'default-image.jpg'} alt={name} className="w-full h-64 object-cover" />
        <h1 className="text-2xl font-bold">{name}</h1>
        <p>{longDescription}</p>
        <div className="pet-info">
          <p><strong>Age:</strong> {age}</p>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Short Description:</strong> {shortDescription}</p>
        </div>
        <button onClick={handleAdoptClick} className="mt-4 bg-blue-500 text-white p-2 rounded">Adopt</button>
      </div> */}
      <div className="max-w-4xl mt-7 mb-7 mx-auto bg-yellow-100 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className='flex justify-center'>
          <img
            src={imageUrl || 'default-image.jpg'}
            alt={name}
            className=" h-96 rounded-3xl mt-5 object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-yellow-800 mb-2">Pet Name: {name}</h1>
          {/* <p className="text-yellow-700 mb-4">{longDescription}</p> */}
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(longDescription) }}></div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <strong className="text-yellow-900 mr-2">Age:</strong>
              <span>{age}</span>
            </div>
            <div className="flex items-center">
              <strong className="text-yellow-900 mr-2">Location:</strong>
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <strong className="text-yellow-900 mr-2">Category:</strong>
              <span>{category}</span>
            </div>
            <div className="flex items-center">
              <strong className="text-yellow-900 mr-2">Short Description:</strong>
              <span>{shortDescription}</span>
            </div>
          </div>
          <button
            onClick={handleAdoptClick}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-2xl">
            Adopt {name}
          </button>
        </div>
      </div>

      {/* <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>{`Adopt ${name}`}</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Address</label>
            <textarea name="address" value={formData.address} onChange={handleInputChange} required></textarea>
          </div>
          <div>
            <label>User Name</label>
            <input type="text" value={user.displayName} disabled />
          </div>
          <div>
            <label>User Email</label>
            <input type="email" value={user.email} disabled />
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded">Submit</button>
        </form>
      </Modal> */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 transform transition-all duration-300 scale-95 hover:scale-100">
          <h2 className="text-2xl font-bold text-green-600 text-center mb-4">{`Adopt ${name}`}</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">User Name</label>
              <input
                type="text"
                value={user?.displayName}
                disabled
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">User Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-400 text-white py-3 px-6 rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-2xl">
              Submit
            </button>
          </form>
        </div>
      </Modal>

    </div>
  );
};

export default PetDetails;
