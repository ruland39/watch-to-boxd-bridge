const ProblemSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-8 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-100 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-4xl opacity-20">😤</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            The Problem
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-red-500 mt-1">❌</span>
                <p className="text-gray-700">Streaming platforms don't talk to Letterboxd</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 mt-1">❌</span>
                <p className="text-gray-700">Export formats are incompatible</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-red-500 mt-1">❌</span>
                <p className="text-gray-700">Existing tools are technical & platform-specific</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 mt-1">❌</span>
                <p className="text-gray-700">Manual formatting is tedious</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection; 