const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 relative overflow-hidden">
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
      </div>
    </section>
  );
};

export default FeaturesSection; 