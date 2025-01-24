import { FaGithub, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
    const { googleSignIn, githubLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGithubSignIn = () => {
        githubLogin()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
                    role: 'user'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
                    .catch(error => {
                        console.error('Error during sign-in:', error);
                    });
            })

    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
                    role: 'user'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
                    .catch(error => {
                        console.error('Error during sign-in:', error);
                    });
            })
    }
    return (
        <div>
            <div className="px-8">
                <div className="divider"></div>
                <div className=" flex justify-around gap-4 mb-4">
                    <button onClick={handleGoogleSignIn} className="btn w-1/2">


                        <FaGoogle className="mr-4"></FaGoogle> Google
                    </button>
                    <button onClick={handleGithubSignIn} className="btn w-1/2">


                        <FaGithub className="mr-4"></FaGithub> Github
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;