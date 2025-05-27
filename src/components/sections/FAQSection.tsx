import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" defaultValue="item-1" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-none bg-white/80 rounded-xl">
              <AccordionTrigger className="p-4 hover:bg-white transition-colors duration-300 hover:no-underline rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900">Is my data safe?</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-gray-600">
                  Your data is processed entirely in your browser. We never store your viewing history or personal information on our servers.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-none bg-white/80 rounded-xl">
              <AccordionTrigger className="p-4 hover:bg-white transition-colors duration-300 hover:no-underline rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900">How accurate is the matching?</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-gray-600">
                  Our matching algorithm achieves 95% accuracy. You can review and edit any matches before exporting.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-none bg-white/80 rounded-xl">
              <AccordionTrigger className="p-4 hover:bg-white transition-colors duration-300 hover:no-underline rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900">Do I need a Letterboxd account?</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-gray-600">
                  Yes, you'll need a Letterboxd account to import your history. It's free to create one!
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-none bg-white/80 rounded-xl">
              <AccordionTrigger className="p-4 hover:bg-white transition-colors duration-300 hover:no-underline rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900">What formats are supported?</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-gray-600">
                  Currently, we support Netflix viewing history CSV files. More platforms coming soon!
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 