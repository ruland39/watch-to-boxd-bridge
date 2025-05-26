
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentPlatform, setCurrentPlatform] = useState(0);
  const platforms = [
    { name: "Netflix", color: "text-red-600" },
    { name: "Prime Video", color: "text-blue-600" },
    { name: "Disney+", color: "text-purple-600" },
    { name: "Apple TV+", color: "text-gray-800" },
    { name: "Hulu", color: "text-green-600" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlatform((prev) => (prev + 1) % platforms.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [platforms.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-blue-500/10 to-purple-500/10"></div>
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Bring your{" "}
            <span 
              className={`${platforms[currentPlatform].color} transition-colors duration-500`}
              key={currentPlatform}
            >
              {platforms[currentPlatform].name}
            </span>{" "}
            watch history to{" "}
            <span className="text-orange-500">Letterboxd</span> in seconds
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            WatchToBoxd lets you clean, match, and export your watched movies from any streaming platform 
            into a Letterboxd-ready CSV — no tech skills required.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="text-lg px-8 py-4 bg-red-600 hover:bg-red-700">
            Upload Your Watch History
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4">
            See How It Works
          </Button>
        </div>

        <div className="text-sm text-gray-500 mb-8">
          ✓ No account required  ✓ 100% free  ✓ Privacy-first
        </div>

        {/* Background Section */}
        <div className="max-w-4xl mx-auto mb-12 p-8 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Problem</h3>
          <div className="text-gray-700 space-y-4 text-left">
            <p>
              Many movie lovers track their viewing activity on streaming platforms, but these services 
              don't integrate directly with <strong>Letterboxd</strong>, the most popular social platform 
              for film tracking and discovery.
            </p>
            <p>
              While platforms like Netflix allow users to export viewing data as CSV, the format is 
              incompatible with Letterboxd's required import format.
            </p>
            <p>
              Most existing conversion tools are technical scripts, poorly designed, or platform-specific — 
              leaving average users stranded.
            </p>
          </div>
        </div>

        {/* USP Section */}
        <div className="max-w-4xl mx-auto mb-12 p-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Solution</h3>
          <p className="text-xl text-gray-800 font-medium">
            The only <span className="text-red-600">no-code, no-signup</span> web app that turns 
            your streaming platform viewing history into a Letterboxd import file in seconds.
          </p>
        </div>

        {/* Future Flow Section */}
        <div className="max-w-4xl mx-auto mb-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Coming Soon</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="text-center">
              <div className="text-blue-600 font-semibold mb-2">Direct Integration</div>
              <p className="text-gray-700 text-sm">
                Import to Letterboxd via OAuth
              </p>
            </div>
            <div className="text-center">
              <div className="text-purple-600 font-semibold mb-2">Smart Sync</div>
              <p className="text-gray-700 text-sm">
                Automatic syncing & deduplication
              </p>
            </div>
            <div className="text-center">
              <div className="text-green-600 font-semibold mb-2">Multi-Platform</div>
              <p className="text-gray-700 text-sm">
                Prime, Disney+, Apple TV+ & more
              </p>
            </div>
          </div>
        </div>

        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 mx-auto text-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
