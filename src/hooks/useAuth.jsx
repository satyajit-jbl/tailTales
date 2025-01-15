import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
    // const a = useState();
    // return a;
};

export default useAuth;