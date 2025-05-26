
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 px-4">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to migrate your movie history?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of movie lovers who've already made the switch
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-red-600 hover:bg-gray-100">
            Start Converting Now
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-red-600">
            Learn More
          </Button>
        </div>

        <div className="text-sm opacity-75">
          No registration required • Works with any Netflix account • 100% free
        </div>
      </div>
    </section>
  );
};

export default CTASection;
