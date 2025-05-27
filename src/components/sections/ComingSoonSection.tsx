import React from 'react';
import { CalendarClock, Sparkles, Tv2 } from 'lucide-react';

const ComingSoonSection = () => {
  const upcomingFeatures = [
    {
      icon: <Tv2 className="w-8 h-8 text-purple-500" />,
      title: "More Streaming Services",
      description: "Support for Disney+, HBO Max, and other major streaming platforms coming soon"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
      title: "Smart Recommendations",
      description: "AI-powered movie recommendations based on your watch history"
    },
    {
      icon: <CalendarClock className="w-8 h-8 text-green-500" />,
      title: "Real-time Sync",
      description: "Automatic synchronization of your watch history in real-time"
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're working hard to bring you even more features to enhance your movie tracking experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {upcomingFeatures.map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonSection; 