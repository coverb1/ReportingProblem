import Footer from "../components/LandingPage/Footer";
import Navbar from "../components/LandingPage/Navbar";
import ProblemCategories from "../components/LandingPage/Problemcategories";
import Process from "../components/LandingPage/Process";
import Hero from "../components/LandingPage/Report";

export default function Home() {

    return (
        <div>
            <Navbar />
            <Hero />
            <Process/>
            <ProblemCategories/>
            <Footer/>
        </div>
    )

}