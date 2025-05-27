const SolutionSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-4xl opacity-20">🎉</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="text-2xl">💡</span>
            Our Solution
          </h3>
          <div className="text-center">
            <p className="text-xl text-gray-800 font-medium mb-4">
              The only <span className="text-green-600 font-bold">no-code, no-signup</span> web app that turns 
              your streaming platform viewing history into a Letterboxd import file in seconds.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✨</span>
              <span>Upload → Clean → Match → Export → Import</span>
              <span className="text-green-500">✨</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection; 