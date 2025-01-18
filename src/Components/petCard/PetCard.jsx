import { Link } from "react-router-dom";

const PetCard = ({ item }) => {
  const { imageUrl, name, age, category, _id } = item;

  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <figure className="relative w-full h-56">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="mt-2 text-gray-600">Age: {age}</p>
        <p className="mt-2 text-gray-600">Category: {category}</p>
        <div className="mt-4 flex justify-end">
          <Link to={`/petDetails/${_id}`}>
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-200">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
