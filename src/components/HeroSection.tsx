
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-blue-500/10 to-purple-500/10"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Bring your <span className="text-red-600">Netflix</span> watch history to{" "}
            <span className="text-orange-500">Letterboxd</span> in seconds
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            WatchToBoxd lets you clean, match, and export your watched movies from Netflix 
            into a Letterboxd-ready CSV — no tech skills required.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="text-lg px-8 py-4 bg-red-600 hover:bg-red-700">
            Upload Netflix History
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4">
            See How It Works
          </Button>
        </div>

        <div className="text-sm text-gray-500 mb-8">
          ✓ No account required  ✓ 100% free  ✓ Privacy-first
        </div>

        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 mx-auto text-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
