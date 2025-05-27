import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, Play, Zap, Shield, Globe } from "lucide-react";
import { useState, useEffect } from "react";

const platforms = [
  { name: "Netflix", color: "text-red-600", logo: "🎬" },
  { name: "Prime Video", color: "text-blue-600", logo: "📺" },
  { name: "Disney+", color: "text-purple-600", logo: "🏰" },
  { name: "Apple TV+", color: "text-gray-800", logo: "🍎" },
  { name: "HBO Max", color: "text-purple-600", logo: "🎭" },
  { name: "Hulu", color: "text-green-600", logo: "📱" }
];

const HeroSection = () => {
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlatformIndex((prev) => (prev + 1) % platforms.length);
    }, 2000); // Change platform every 2 seconds

    return () => clearInterval(interval);
  }, []);

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
            🎬 Bring your{" "}
            <span
              className={`inline-block transition-all duration-500 ${platforms[currentPlatformIndex].color}`}
              style={{ minWidth: "180px" }}
            >
              {platforms[currentPlatformIndex].name}
            </span>{" "}
            watch history to{" "}
            <span className="text-orange-500">Letterboxd</span> in seconds
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            WatchToBoxd lets you clean, match, and export your watched movies from streaming services
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
          <div className="flex justify-center gap-6 items-center flex-wrap max-w-4xl mx-auto">
            {platforms.map((platform, index) => (
              <div 
                key={index} 
                className={`text-2xl transition-all duration-500 hover:scale-110 ${
                  index === currentPlatformIndex ? 'scale-125 opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <span className="block text-3xl mb-1">{platform.logo}</span>
                <span className={`text-xs font-medium ${platform.color}`}>{platform.name}</span>
              </div>
            ))}
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
