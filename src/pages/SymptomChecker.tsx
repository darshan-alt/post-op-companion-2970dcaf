import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

const questions = [
  {
    id: 1,
    question: "Are you feeling chest pain, pressure, or heaviness?",
    severity: "emergency",
  },
  {
    id: 2,
    question: "Is there active bleeding or a golf-ball sized lump at your incision site?",
    severity: "emergency",
  },
  {
    id: 3,
    question: "Are you experiencing sudden shortness of breath while resting?",
    severity: "emergency",
  },
  {
    id: 4,
    question: "Is the limb used for the procedure feeling cold, numb, or turning blue?",
    severity: "urgent",
  },
  {
    id: 5,
    question: "Do you have a fever over 101°F or pus-like drainage at the site?",
    severity: "urgent",
  },
];

type Answer = "yes" | "no" | null;

export default function SymptomChecker() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});

  const currentQuestion = questions[currentStep - 1];
  const totalSteps = questions.length;

  const handleAnswer = (answer: Answer) => {
    const newAnswers = { ...answers, [currentStep]: answer };
    setAnswers(newAnswers);

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result and navigate
      const emergencyYes = questions
        .filter((q) => q.severity === "emergency")
        .some((q) => newAnswers[q.id] === "yes");
      
      const urgentYes = questions
        .filter((q) => q.severity === "urgent")
        .some((q) => newAnswers[q.id] === "yes");

      let status: "emergency" | "urgent" | "normal";
      if (emergencyYes) {
        status = "emergency";
      } else if (urgentYes) {
        status = "urgent";
      } else {
        status = "normal";
      }

      navigate("/results", { state: { status } });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-8 flex flex-col">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="-ml-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Symptom Checker</h1>
          <p className="text-muted-foreground mt-1">Answer each question honestly</p>
        </header>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} className="mb-8" />

        {/* Question Card */}
        <Card className="flex-1 flex flex-col border-2 border-border">
          <CardContent className="flex-1 flex flex-col justify-center p-8">
            <p className="text-2xl font-medium text-foreground text-center leading-relaxed mb-12">
              {currentQuestion.question}
            </p>

            <div className="space-y-4">
              <Button
                onClick={() => handleAnswer("yes")}
                className="w-full h-16 text-xl font-semibold bg-status-emergency hover:bg-status-emergency/90 text-white shadow-lg"
              >
                Yes
              </Button>
              <Button
                onClick={() => handleAnswer("no")}
                className="w-full h-16 text-xl font-semibold bg-status-normal hover:bg-status-normal/90 text-white shadow-lg"
              >
                No
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
