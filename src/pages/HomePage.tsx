import HeroSection from '../components/sections/HeroSection';
import ProblemSection from '../components/sections/ProblemSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import SolutionSection from '../components/sections/SolutionSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import FAQSection from '../components/sections/FAQSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTASection from '../components/sections/CTASection';
import Footer from '../components/sections/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <SolutionSection />
      <FeaturesSection />
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage; 