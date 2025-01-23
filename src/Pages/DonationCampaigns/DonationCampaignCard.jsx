import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML
import { Link } from 'react-router-dom';
const DonationCampaignCard = ({ campaign }) => {
  const { _id, petName, imageUrl, maxDonation, lastDate, shortDescription, longDescription,currentAmount } = campaign;
  // const currentAmount = 15; // Assuming 0 as the default for demonstration
  const isDonationClosed = new Date() > new Date(lastDate); // Check if the donation period is over


  return (
    <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <img src={imageUrl} alt={petName} className="w-full h-60" />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">{petName}</h2>
        <p className="text-gray-600 mt-2">{shortDescription}</p>
        {/* <p className="text-gray-600 mt-2">{longDescription}</p> */}
        {/*  Import DOMPurify for sanitizing HTML */}
        {/* To safely display HTML content (such as longDescription), use DOMPurify to sanitize it before rendering. This is especially important if you're displaying this data anywhere in the application. */}
        <div
          // className="long-description"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(longDescription) }}
        ></div>
        {/*  Import DOMPurify for sanitizing HTML */}

        <div className="mt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Raised:</span>
            <span className="text-gray-800 font-semibold">
              ${currentAmount} / ${maxDonation}
            </span>
          </div>
          <div className="relative w-full h-4 bg-gray-200 rounded mt-2">
            <div
              className="absolute top-0 left-0 h-4 bg-[#FF921C]"
              style={{ width: `${(currentAmount / maxDonation) * 100}%` }}
            ></div>
          </div>
        </div>

        <p className="text-gray-600 mt-4">
          Last Date: <span className="text-gray-800 font-semibold">{new Date(lastDate).toLocaleDateString()}</span>
        </p>

        <div className="mt-6 flex justify-between">
          <button
            className={`py-2 px-4 rounded ${isDonationClosed ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#FF921C] text-white hover:bg-blue-600'}`}
            disabled={isDonationClosed}
          >
            Donate Now
          </button>
          <Link to={`/donationDetails/${_id}`}><button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">View Details</button></Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCampaignCard;

