
const Footer = () => {
  return (
    <footer className="py-12 bg-gray-900 text-white px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">WatchToBoxd</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              The easiest way to bring your Netflix watch history to Letterboxd. 
              Bridge the gap between platforms with one simple tool.
            </p>
            <div className="text-sm text-gray-500">
              Built with ❤️ for movie lovers
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">How it works</a></li>
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="https://netflix.com/account/getmyinfo" className="hover:text-white">Netflix Data Export</a></li>
              <li><a href="https://letterboxd.com/import/" className="hover:text-white">Letterboxd Import</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 WatchToBoxd. Made for the movie community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
