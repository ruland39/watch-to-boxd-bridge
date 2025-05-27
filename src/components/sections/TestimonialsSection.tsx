import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Movie Enthusiast",
    content: "Finally, a tool that makes it easy to bring my Netflix history to Letterboxd! This is exactly what I've been looking for.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    name: "Michael Chen",
    role: "Film Critic",
    content: "The accuracy of the movie matching is impressive. Saved me hours of manual work!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
  },
  {
    name: "Emma Davis",
    role: "Letterboxd Pro User",
    content: "Simple, fast, and effective. Exactly what the movie community needed.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
  },
  {
    name: "Alex Thompson",
    role: "Film Student",
    content: "This tool has revolutionized how I track my movie watching habits. Brilliant!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const slideToIndex = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => {
    slideToIndex((currentIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    slideToIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Testimonials Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of movie lovers who have already made the switch to Letterboxd
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-3xl mx-auto mb-32">
          <div className="overflow-hidden">
            <div 
              ref={containerRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white/80 backdrop-blur rounded-lg p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{testimonial.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => slideToIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentIndex === index ? "bg-blue-500 w-4" : "bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-4xl opacity-20">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="text-2xl">🔮</span>
              Coming Soon
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Direct Integration Card */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/90 cursor-pointer">
                <div className="text-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-3xl">🔗</span>
                </div>
                <h4 className="text-lg font-semibold text-blue-600 mb-3 text-center">Direct Integration</h4>
                <p className="text-gray-700 text-center">Import to Letterboxd via OAuth</p>
              </div>

              {/* Smart Sync Card */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/90 cursor-pointer">
                <div className="text-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-3xl">🔄</span>
                </div>
                <h4 className="text-lg font-semibold text-purple-600 mb-3 text-center">Smart Sync</h4>
                <p className="text-gray-700 text-center">Automatic syncing & deduplication</p>
              </div>

              {/* Multi-Platform Card */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/90 cursor-pointer">
                <div className="text-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-3xl">🌐</span>
                </div>
                <h4 className="text-lg font-semibold text-green-600 mb-3 text-center">Multi-Platform</h4>
                <p className="text-gray-700 text-center">Prime, Disney+, Apple TV+ & more</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection; 