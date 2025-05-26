
import { Card, CardContent } from "@/components/ui/card";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "Upload Netflix CSV",
      description: "Download your viewing history from Netflix account settings and upload it to WatchToBoxd",
      color: "bg-red-100 text-red-600"
    },
    {
      number: "2", 
      title: "Preview & Select",
      description: "Review matched movies, edit any titles if needed, and choose which ones to include",
      color: "bg-blue-100 text-blue-600"
    },
    {
      number: "3",
      title: "Export & Import",
      description: "Download your Letterboxd-ready CSV and import it directly to your Letterboxd account",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Three simple steps to move your movie history
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center text-2xl font-bold mx-auto mb-6`}>
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
