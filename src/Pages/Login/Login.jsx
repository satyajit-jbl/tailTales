
import { useContext, useEffect, useState } from 'react';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
// import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
// import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { AuthContext } from '../../provider/AuthProvider';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import Lottie from "lottie-react";
import loginAnimation from '../../login-animation.json'


const Login = () => {


    const [disabled, setDisabled] = useState(true);

    const { signIn } = useContext(AuthContext);


    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location of login page', location.state);

    // useEffect(() => {
    //     loadCaptchaEnginge(6)
    // }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "User Login Successfully",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                navigate(from, { replace: true });
            })
    }

    // const handleValidateCaptcha = (e) => {
    //     const user_captcha_value = e.target.value
    //     if (validateCaptcha(user_captcha_value)) {
    //         setDisabled(false)
    //     } else {
    //         setDisabled(true)
    //     }
    // }
    return (
        <>
            {/* <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet> */}
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        {/* <h1 className="text-5xl font-bold text-[#FF921C]">Log In to TailTales Now!</h1>
                        <h1 className="text-2xl font-bold text-[#FF921C]">Unlock Paw-sibilities</h1> */}
                        <h1 className="text-5xl font-bold text-[#FF921C] drop-shadow-lg animate-bounce">Log In to TailTales Now!</h1>
                        <h1 className="text-2xl font-bold text-[#FF921C] mt-4 italic tracking-wide animate-pulse">Unlock Paw-sibilities</h1>

                        {/* <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p> */}
                        <Lottie animationData={loginAnimation} />
                    </div>
                    <div className="card bg-base-100 md:w-1/2 max-w-sm  shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text"  name="caltcha" placeholder="Type the text above" className="input input-bordered" />
                                
                            </div> */}
                            <div className="form-control mt-6">
                                {/* TO DO : APPLY disabled for catcha */}
                                {/* <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" /> */}
                                <input disabled={false} className="btn btn-ghost bg-[#FF921C]" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='text-center'><small>New Here ?<Link to="/signup"> Create an Account</Link></small></p>
                        <SocialLogin></SocialLogin>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Login;