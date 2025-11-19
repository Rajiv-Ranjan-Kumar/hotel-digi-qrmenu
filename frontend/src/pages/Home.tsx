import Hero from '../components/Hero';
import Features from '../components/Features';
import Workflow from '../components/Workflow';
import Pricing from '../components/Pricing';
import Testimonials from '../components/testimonials';
import FAQSection from '../components/faqs';
import FinalCTA from '../components/FinalCTA';



function Home() {
    return (
        <>
            <Hero />
            <Features />
            <Workflow />
            <Pricing />
            <Testimonials />
            <FAQSection />
            <FinalCTA />
        </>
    )
}
export default Home;