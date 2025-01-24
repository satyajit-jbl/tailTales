import { FaSearch } from 'react-icons/fa';
import bannerImage from '../../../assets/banner.jpg';
import dogImage from '../../../assets/logo (1).png';

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-auto md:h-96"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center justify-center h-full py-12">
          {/* Search Box */}
          <div className="bg-white rounded-md shadow-md p-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-5 max-w-3xl w-full">
            <input
              type="text"
              placeholder="Search Terrier, Kitten, etc."
              className="px-4 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none border border-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="text"
              placeholder="Enter City, State, or ZIP"
              className="px-4 py-2 rounded-md sm:rounded-none border border-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-purple-700">
              <FaSearch />
            </button>
          </div>

          {/* Heading and Subheading */}
          <h1 className="text-2xl md:text-4xl font-bold text-white mt-8">
            Find your new best friend
          </h1>
          <p className="text-sm md:text-base text-white mt-4 max-w-2xl">
            Browse pets from our network of over 14,500 shelters and rescues.
          </p>

          {/* Cards Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-4xl">
            <div className="bg-white p-4 rounded-md shadow-md text-center">
              <div className="flex justify-center">
                <img src={dogImage} alt="Dogs" className="h-12 w-12" />
              </div>
              <p className="mt-2 font-semibold text-gray-700">Dogs</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md text-center">
              <div className="flex justify-center">
                <img src={dogImage} alt="Cats" className="h-12 w-12" />
              </div>
              <p className="mt-2 font-semibold text-gray-700">Cats</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md text-center">
              <div className="flex justify-center">
                <img src={dogImage} alt="Other Animals" className="h-12 w-12" />
              </div>
              <p className="mt-2 font-semibold text-gray-700">Other Animals</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md text-center">
              <div className="flex justify-center">
                <img src={dogImage} alt="Shelters & Rescues" className="h-12 w-12" />
              </div>
              <p className="mt-2 font-semibold text-gray-700">Shelters & Rescues</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Banner;
