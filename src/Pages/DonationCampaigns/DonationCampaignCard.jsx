import DOMPurify from 'dompurify';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const DonationCampaignCard = ({ campaign }) => {
  const { _id, petName, imageUrl, maxDonation, lastDate, longDescription, currentAmount } = campaign;
  const [showFull, setShowFull] = useState(false);

  const toggleDescription = () => setShowFull(!showFull);

  const truncateHTML = (html, limit) => {
    const plainText = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
    return plainText.length > limit ? `${plainText.slice(0, limit)}...` : plainText;
  };

  const truncatedDescription = truncateHTML(longDescription, 100);
  const isDonationClosed = new Date() > new Date(lastDate);

  return (
    <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col">
      <img src={imageUrl} alt={petName} className="w-full h-60 object-cover" />
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800">{petName}</h2>

        <div className="mt-2 text-gray-600">
          {showFull ? (
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(longDescription) }} />
          ) : (
            <p>{truncatedDescription}</p>
          )}
          <button 
            className="text-blue-500 underline mt-2" 
            onClick={toggleDescription}
          >
            {showFull ? "Show Less" : "Read More"}
          </button>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Raised:</span>
            <span className="text-gray-800 font-semibold">
              ${currentAmount} / ${maxDonation}
            </span>
          </div>
          <div className="relative w-full h-4 bg-gray-200 rounded mt-2">
            <div
              className="absolute top-0 left-0 h-4 bg-orange-500"
              style={{ width: `${(currentAmount / maxDonation) * 100}%` }}
            ></div>
          </div>
        </div>

        <p className="text-gray-600 mt-4">
          Last Date: <span className="text-gray-800 font-semibold">{new Date(lastDate).toLocaleDateString()}</span>
        </p>

        <div className="mt-auto">
          <Link to={`/donationDetails/${_id}`}>
            <button
              className={`py-2 px-4 rounded w-full ${
                isDonationClosed ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
              disabled={isDonationClosed}
            >
              {isDonationClosed ? "Campaign Closed" : "Donate Now"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCampaignCard;
