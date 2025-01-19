import React from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import Modal from 'react-modal'; // Assuming you're using react-modal
import { useQuery } from '@tanstack/react-query';
// import useAxiosPublic from '../../hooks/useAxiosPublic'; // Import the axios hook
// import useAuth from '../../hooks/useAuth'; // Import the useAuth hook
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';

const PetDetails = () => {
  const { id } = useParams(); // Get pet ID from URL
  const axiosPublic = useAxiosPublic(); // Get axios instance
  const { user } = useAuth(); // Get user info from Auth context
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
        alert('Adoption request submitted successfully!');
        setIsModalOpen(false);
      } else {
        alert('Failed to submit adoption request.');
      }
    } catch (error) {
      alert('Error submitting adoption request.');
    }
  };

  return (
    <div className="pet-details">
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

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
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
      </Modal>
    </div>
  );
};

export default PetDetails;
