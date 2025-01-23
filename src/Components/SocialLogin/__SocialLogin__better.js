import { FaGoogle, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

//  need to change auth providor function

const SocialLogin = () => {
    const { googleSignIn, githubSignIn } = useAuth(); // Import GitHub sign-in
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleSocialSignIn = (signInMethod) => {
        signInMethod()
            .then((result) => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
                    role: 'user',
                };
                axiosPublic
                    .post('/users', userInfo)
                    .then(() => {
                        navigate('/');
                    })
                    .catch((error) => {
                        console.error('Error during sign-in:', error);
                    });
            })
            .catch((error) => {
                console.error('Error during social sign-in:', error);
            });
    };

    return (
        <div className="p-8">
            <div className="divider"></div>
            <button
                onClick={() => handleSocialSignIn(googleSignIn)}
                className="btn"
            >
                <FaGoogle className="mr-4" /> Google
            </button>
            <button
                onClick={() => handleSocialSignIn(githubSignIn)}
                className="btn mt-4"
            >
                <FaGithub className="mr-4" /> GitHub
            </button>
        </div>
    );
};

export default SocialLogin;
