import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import SolutionSection from "@/components/sections/SolutionSection";
import ProblemSection from "@/components/sections/ProblemSection";

const Index = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px -50px 0px'  // Increased top margin to trigger earlier
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, observerOptions);

    // Observe all sections except HeroSection
    const sections = document.querySelectorAll('section:not(:first-child)');
    sections.forEach((section) => {
      // Add initial classes
      section.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section height
      const heroSection = document.querySelector('section');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        setShowBackToTop(window.scrollY > heroHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <HeroSection />
        <section className="transform" id="problem">
          <ProblemSection />
        </section>
        <section className="transform" id="solution">
          <SolutionSection />
        </section>
        <section className="transform" id="how-it-works">
          <HowItWorksSection />
        </section>
        <section className="transform" id="testimonials">
          <TestimonialsSection />
        </section>
        <section className="transform" id="faq">
          <FAQSection />
        </section>
        <section className="transform" id="cta">
          <CTASection />
        </section>
        <Footer />
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-4",
          "flex items-center gap-2 text-gray-700 hover:text-gray-900",
          "transition-all duration-300 ease-in-out transform",
          "hover:shadow-xl hover:-translate-y-1",
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
          "z-50" // Ensure it's above other content
        )}
      >
        <span className="text-sm font-medium">Back to top</span>
        <ChevronUp className="w-4 h-4 animate-subtle-bounce" />
      </button>
    </>
  );
};

export default Index;
