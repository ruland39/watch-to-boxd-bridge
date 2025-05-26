
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Search, FileText, ArrowDown } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Upload,
      title: "Simple CSV Upload",
      description: "Just upload your Netflix viewing history CSV from your account settings. We handle the rest automatically."
    },
    {
      icon: Search,
      title: "Smart Movie Matching",
      description: "Our AI matches your Netflix titles to accurate movie entries using TMDB database for perfect imports."
    },
    {
      icon: FileText,
      title: "Letterboxd-Ready Export",
      description: "Get a perfectly formatted CSV that imports seamlessly into Letterboxd with all the right data fields."
    },
    {
      icon: ArrowDown,
      title: "Guided Import Process",
      description: "Step-by-step instructions to upload your converted file directly to Letterboxd's import feature."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why WatchToBoxd?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No more manual CSV formatting, title matching, or data cleanup headaches. 
            We make the migration effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <feature.icon className="h-12 w-12 mx-auto text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
