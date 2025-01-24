import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import CallToAction from "../AddPet/CallToAction/CallToAction";
import AboutUs from "./AboutUs/AboutUs";
import AdoptionSection from "./AdoptionSection/AdoptionSection";
import AdoptionArticlesSection from "./AdoptionArticlesSection/AdoptionArticlesSection";
import PetListHome from "./PetListHome/PetListHome";
import FAQSection from "./FAQSection/FAQSection";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>tailTales - Home</title>
            </Helmet>
            <Banner></Banner>
            <PetListHome></PetListHome>
            <CallToAction></CallToAction>
            <AboutUs></AboutUs>
            
            <AdoptionSection></AdoptionSection>
            <AdoptionArticlesSection></AdoptionArticlesSection>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;