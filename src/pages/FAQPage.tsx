import { useNavigate } from "react-router-dom";
import { ArrowLeft, Droplets, Dumbbell, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";

const faqs = [
  {
    id: "shower",
    icon: Droplets,
    question: "When can I shower?",
    answer:
      "You may shower after 24 hours following your procedure. Keep the catheter insertion site dry for the first 24 hours. When you do shower, avoid scrubbing the area and pat it dry gently. Avoid soaking in baths, hot tubs, or swimming pools for at least one week.",
  },
  {
    id: "lifting",
    icon: Dumbbell,
    question: "How much weight can I lift?",
    answer:
      "For the first week after your procedure, avoid lifting anything heavier than 5-10 pounds (about the weight of a gallon of milk). This helps prevent bleeding at the catheter site. After one week, gradually increase activity as tolerated. Avoid strenuous exercise for 2 weeks.",
  },
  {
    id: "bruising",
    icon: Palette,
    question: "Is bruising normal?",
    answer:
      "Yes, bruising around the catheter insertion site is completely normal and expected. The bruise may appear colorful (purple, blue, green, yellow) as it heals over 1-2 weeks. However, if you notice a growing lump, increasing pain, or active bleeding, contact your care team immediately.",
  },
];

export default function FAQPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-8 flex flex-col">
        {/* Header */}
        <header className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            Post-Op Care Guide
          </h1>
          <p className="text-muted-foreground mt-1">
            Angioplasty (PCI) Recovery FAQs
          </p>
        </header>

        {/* FAQ Accordion */}
        <div className="flex-1">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-2 border-border rounded-lg bg-card px-4 data-[state=open]:border-clinical"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-3 text-left">
                    <div className="p-2 rounded-full bg-clinical-light flex-shrink-0">
                      <faq.icon className="h-5 w-5 text-clinical" />
                    </div>
                    <span className="font-medium text-foreground text-lg">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-14 pr-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Disclaimer */}
        <div className="mt-8">
          <MedicalDisclaimer />
        </div>
      </div>
    </div>
  );
}
