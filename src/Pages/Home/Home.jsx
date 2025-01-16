import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import CallToAction from "../AddPet/CallToAction/CallToAction";
import AboutUs from "./AboutUs/AboutUs";
import AdoptionSection from "./AdoptionSection/AdoptionSection";
import AdoptionArticlesSection from "./AdoptionArticlesSection/AdoptionArticlesSection";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>tailTales - Home</title>
            </Helmet>
            <Banner></Banner>
            <CallToAction></CallToAction>
            <AboutUs></AboutUs>
            <AdoptionSection></AdoptionSection>
            <AdoptionArticlesSection></AdoptionArticlesSection>
        </div>
    );
};

export default Home;