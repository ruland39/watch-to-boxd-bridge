const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">How It Works</h2>
        <p className="text-gray-600 text-center mb-12">Three simple steps to move your movie history</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl font-bold text-red-600">
              1
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-red-50 border border-red-100 h-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload Netflix CSV</h3>
              <p className="text-gray-600">Download your viewing history from Netflix account settings and upload it to WatchToBoxd</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl font-bold text-orange-600">
              2
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-orange-50 border border-orange-100 h-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Preview & Select</h3>
              <p className="text-gray-600">Review matched movies, edit any titles if needed, and choose which ones to include</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-600">
              3
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-green-50 border border-green-100 h-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Export & Import</h3>
              <p className="text-gray-600">Download your Letterboxd-ready CSV and import it directly to your Letterboxd account</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 