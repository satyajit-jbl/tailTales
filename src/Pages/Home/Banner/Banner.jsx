
import { FaSearch } from 'react-icons/fa';
import bannerImage from '../../../assets/banner.jpg'
import dogImage from '../../../assets/logo (1).png'


const Banner = () => {
  return (
    <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: `url(${bannerImage})`  }}>
      {/* <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div> */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="bg-white rounded-md shadow-md p-4 flex space-x-4 mt-5">
            <input
              type="text"
              placeholder="Search Terrier, Kitten, etc."
              className="px-4 py-2 rounded-l-md border border-gray-300 flex-1 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Enter City, State, or ZIP"
              className="px-4 py-2 border border-gray-300 flex-1 focus:outline-none"
            />
            <button className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700">
              <FaSearch></FaSearch>
            </button>
          </div>
          <h1 className="text-4xl font-bold text-white mt-8">
            Find your new best friend
          </h1>
          <p className="text-white mt-4">
            Browse pets from our network of over 14,500 shelters and rescues.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white p-4 rounded-md shadow-md text-center">
              <div className='flex justify-center'>
              <img className='' src={dogImage} alt="" />
              </div>
              <p className="mt-2 font-semibold">Dogs</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md text-center">
            <div className='flex justify-center'>
              <img className='' src={dogImage} alt="" />
              </div>
              <p className="mt-2 font-semibold">Cats</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md text-center">
            <div className='flex justify-center'>
              <img className='' src={dogImage} alt="" />
              </div>
              <p className="mt-2 font-semibold">Other Animals</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md text-center">
            <div className='flex justify-center'>
              <img className='' src={dogImage} alt="" />
              </div>
              <p className="mt-2 font-semibold">Shelters & Rescues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
