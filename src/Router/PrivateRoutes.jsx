import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the skeleton styles

const PrivateRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="space-y-4">
                {/* You can adjust the skeletons to match your layout */}
                <Skeleton height={50} width={300} />
                <Skeleton height={20} width={250} />
                <Skeleton count={3} height={40} />
            </div>
        );
    }

    // console.log(user);

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;

// Testing the loader 

// import React, { useState, useEffect } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles

// const PrivateRoutes = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const location = useLocation();

//     useEffect(() => {
//         // Simulate an API call with a delay
//         setTimeout(() => {
//             setUser({ name: 'John Doe' }); // Mock user data
//             setLoading(false); // End loading state after 3 seconds
//         }, 3000);
//     }, []);

//     if (loading) {
//         return (
//             <div className="space-y-4">
//                 <Skeleton height={50} width={300} />
//                 <Skeleton height={20} width={250} />
//                 <Skeleton count={3} height={40} />
//             </div>
//         );
//     }

//     if (user) {
//         return children;
//     }

//     return <Navigate to="/login" state={{ from: location }} replace />;
// };

// export default PrivateRoutes;

// Testing the loader 
