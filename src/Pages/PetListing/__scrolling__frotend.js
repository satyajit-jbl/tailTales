import { useState, useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import PetCard from '../../Components/petCard/petCard';

const PetListing = () => {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);  // Track current page
  const [hasMore, setHasMore] = useState(true);  // To track if there are more pets to load
  const [loading, setLoading] = useState(false);
  const axios = useAxiosPublic();

  const fetchPets = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/pets', {
        params: {
          page,
          limit: 10,
          search: searchTerm,
          category: selectedCategory,
        },
      });
      if (response.data.length > 0) {
        setPets((prevPets) => [...prevPets, ...response.data]);
        setHasMore(true);
      } else {
        setHasMore(false); // No more pets to load
      }
    } catch (error) {
      console.error('Error fetching pets', error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch pets when the page or filters change
  useEffect(() => {
    setPets([]);  // Reset pets list before fetching new results
    setPage(1);   // Reset to the first page
    fetchPets();
  }, [searchTerm, selectedCategory]);

  // Load more pets when scrolling to the bottom
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchPets();  // Fetch next page of pets when page number changes
    }
  }, [page]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="min-h-screen" onScroll={handleScroll}>
      <div className="w-full max-w-screen-xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-5 justify-center">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow p-2 border border-gray-300 rounded"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Categories</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Reptile">Reptile</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pets.map((pet) => (
            <PetCard key={pet._id} item={pet} />
          ))}
        </div>
        {loading && <p>Loading more pets...</p>}
        {!hasMore && <p>No more pets to load</p>}
      </div>
    </div>
  );
};

export default PetListing;
