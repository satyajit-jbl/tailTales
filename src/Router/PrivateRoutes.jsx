
import { Navigate, useLocation } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
// import { useContext } from 'react';
// import { AuthContext } from '../providers/AuthProvider';
import useAuth from '../hooks/useAuth';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth();
    // const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <span className="loading loading-ring loading-lg"></span>
    }
    console.log(user);
    if(user){
        return children;
        
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoutes;