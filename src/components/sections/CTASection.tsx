const CTASection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Import Your History?</h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of movie lovers who have already transferred their Netflix history to Letterboxd.
            </p>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-colors duration-300 shadow-lg">
              Get Started - It's Free!
            </button>
            <p className="mt-4 text-indigo-200 text-sm">No signup required • Process in seconds</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 