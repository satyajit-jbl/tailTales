// import React from 'react';
// import useDonation from '../../hooks/useDonation';
// import DonationCampaignCard from './DonationCampaignCard';
// // import { caption } from 'framer-motion/client';
// // import useMyDonations from '../../hooks/useMyDonations';

// const DonationCampaigns = () => {
//     const [AlldonationsCamp] = useDonation();
//     // const [MydonationsCamp] = useMyDonations();
//     console.log(AlldonationsCamp);
    
//     return (
//         <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-5'>
//            {
//             AlldonationsCamp?.map(campaign=><DonationCampaignCard campaign={campaign} key={campaign._id}></DonationCampaignCard>)
           
//            }

//         </div>
//     );
// };

// export default DonationCampaigns;

import React from 'react';
import useDonation from '../../hooks/useDonation';
import DonationCampaignCard from './DonationCampaignCard';

const DonationCampaigns = () => {
    const [AlldonationsCamp] = useDonation();

    // Sort the donations by dateCreated in descending order
    const sortedDonations = AlldonationsCamp?.slice().sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    // Sort the donations by lastDate in descending order
    // const sortedDonations = AlldonationsCamp?.slice().sort((a, b) => new Date(b.lastDate) - new Date(a.lastDate));

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-5'>
            {
                sortedDonations?.map(campaign => (
                    <DonationCampaignCard campaign={campaign} key={campaign._id}></DonationCampaignCard>
                ))
            }
        </div>
    );
};

export default DonationCampaigns;
