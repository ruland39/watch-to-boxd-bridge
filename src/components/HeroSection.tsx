
import { Button } from "@/components/ui/button";
import { ArrowDown, Play, Zap, Shield, Globe } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentPlatform, setCurrentPlatform] = useState(0);
  const platforms = [
    { name: "Netflix", color: "text-red-600", logo: "🎬" },
    { name: "Prime Video", color: "text-blue-600", logo: "📺" },
    { name: "Disney+", color: "text-purple-600", logo: "🏰" },
    { name: "Apple TV+", color: "text-gray-800", logo: "🍎" },
    { name: "Hulu", color: "text-green-600", logo: "📱" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlatform((prev) => (prev + 1) % platforms.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [platforms.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToUpload = () => {
    window.location.href = '/upload';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-blue-500/10 to-purple-500/10"></div>
      <div className="relative z-10 max-w-6xl mx-auto text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Bring your{" "}
            <span className="relative inline-block h-[1.2em] overflow-hidden">
              {platforms.map((platform, index) => (
                <span
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${platform.color} ${
                    index === currentPlatform
                      ? "translate-y-0 opacity-100"
                      : index === (currentPlatform - 1 + platforms.length) % platforms.length
                      ? "-translate-y-full opacity-0"
                      : "translate-y-full opacity-0"
                  }`}
                  style={{
                    transform: index === currentPlatform 
                      ? 'translateY(0%)' 
                      : index < currentPlatform 
                      ? 'translateY(-100%)' 
                      : 'translateY(100%)'
                  }}
                >
                  {platform.logo} {platform.name}
                </span>
              ))}
            </span>{" "}
            watch history to{" "}
            <span className="text-orange-500">Letterboxd</span> in seconds
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            WatchToBoxd lets you clean, match, and export your watched movies from any streaming platform 
            into a Letterboxd-ready CSV — no tech skills required.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 justify-center items-center mb-12 max-w-md mx-auto">
          <Button 
            size="lg" 
            className="w-full text-lg px-8 py-4 bg-red-600 hover:bg-red-700 transition-all duration-300 hover:scale-105"
            onClick={navigateToUpload}
          >
            <Play className="mr-2 h-5 w-5" />
            Upload Your Watch History
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full text-lg px-8 py-4 transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection('how-it-works')}
          >
            See How It Works
          </Button>
        </div>

        <div className="text-sm text-gray-500 mb-12 flex items-center justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <Shield className="h-4 w-4 text-green-500" />
            <span>No account required</span>
          </div>
          <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <Zap className="h-4 w-4 text-blue-500" />
            <span>100% free</span>
          </div>
          <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <Globe className="h-4 w-4 text-purple-500" />
            <span>Privacy-first</span>
          </div>
        </div>

        {/* Streaming Platforms */}
        <div className="mb-12">
          <p className="text-gray-500 text-sm mb-4">Supported platforms</p>
          <div className="flex justify-center gap-8 items-center flex-wrap">
            {platforms.map((platform, index) => (
              <div 
                key={index} 
                className={`text-2xl transition-all duration-500 hover:scale-110 ${
                  index === currentPlatform ? 'scale-125 opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <span className="block text-3xl mb-1">{platform.logo}</span>
                <span className={`text-xs font-medium ${platform.color}`}>{platform.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Background Section */}
        <div className="max-w-4xl mx-auto mb-12 p-8 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-4xl opacity-20">🎭</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="text-2xl">🎬</span>
            The Background
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Many movie lovers track their viewing activity on streaming platforms, but these services don't integrate 
            directly with <strong>Letterboxd</strong> — the most popular social platform for film tracking and discovery. 
            Most existing conversion tools are technical scripts or poorly designed, leaving average users stranded.
          </p>
        </div>

        {/* USP Section */}
        <div className="max-w-4xl mx-auto mb-12 p-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-100 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-4xl opacity-20">⚡</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="text-2xl">💎</span>
            Our Unique Advantage
          </h3>
          <p className="text-xl text-gray-800 font-medium">
            The only <span className="text-orange-600 font-bold">no-code, no-signup</span> web app that turns 
            your streaming platform viewing history into a Letterboxd import file in seconds.
          </p>
        </div>

        {/* Future Features */}
        <div className="max-w-4xl mx-auto mb-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-4xl opacity-20">🚀</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-2xl">🔮</span>
            Coming Soon
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/50 rounded-xl hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-2">🔗</div>
              <div className="text-blue-600 font-semibold mb-2">Direct Integration</div>
              <p className="text-gray-700 text-sm">Import to Letterboxd via OAuth</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-2">🔄</div>
              <div className="text-purple-600 font-semibold mb-2">Smart Sync</div>
              <p className="text-gray-700 text-sm">Automatic syncing & deduplication</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-2">🌐</div>
              <div className="text-green-600 font-semibold mb-2">Multi-Platform</div>
              <p className="text-gray-700 text-sm">Prime, Disney+, Apple TV+ & more</p>
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
