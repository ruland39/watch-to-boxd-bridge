
const StatsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold text-red-600 mb-2 animate-fade-in">500M+</div>
            <div className="text-gray-600">Global streaming subscribers</div>
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold text-orange-500 mb-2 animate-fade-in">10M+</div>
            <div className="text-gray-600">Active Letterboxd users</div>
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold text-blue-600 mb-2 animate-fade-in">95%</div>
            <div className="text-gray-600">Title matching accuracy</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
