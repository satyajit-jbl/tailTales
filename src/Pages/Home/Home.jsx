import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>tailTales - Home</title>
            </Helmet>
            <Banner></Banner>
        </div>
    );
};

export default Home;