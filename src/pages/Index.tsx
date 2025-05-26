
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section:not(:first-child)');
    sections.forEach((section) => {
      section.classList.add('opacity-0', 'translate-y-8');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      <section className="transition-all duration-700">
        <StatsSection />
      </section>
      <section className="transition-all duration-700" id="features">
        <FeaturesSection />
      </section>
      <section className="transition-all duration-700" id="how-it-works">
        <HowItWorksSection />
      </section>
      <section className="transition-all duration-700">
        <CTASection />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
