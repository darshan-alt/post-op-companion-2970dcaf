import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const symptoms = [
  { id: "chest_pain", label: "Chest pain, pressure, or heaviness", severity: "emergency" },
  { id: "bleeding", label: "Active bleeding at incision site", severity: "emergency" },
  { id: "shortness_breath", label: "Sudden shortness of breath while resting", severity: "emergency" },
  { id: "back_pain", label: "Back pain (new or worsening)", severity: "combo" },
  { id: "dizziness", label: "Dizziness or lightheadedness", severity: "combo" },
  { id: "lump", label: "Lump at the incision site", severity: "combo" },
  { id: "pulsating", label: "Pulsating sensation at incision site", severity: "combo" },
  { id: "cold_limb", label: "Limb feeling cold, numb, or turning blue", severity: "urgent" },
  { id: "fever", label: "Fever over 101°F or pus-like drainage", severity: "urgent" },
];

type CriticalCondition = {
  name: string;
  description: string;
  requiredSymptoms: string[];
  severity: "emergency" | "urgent";
};

const criticalCombinations: CriticalCondition[] = [
  {
    name: "Retroperitoneal Hemorrhage",
    description: "Internal bleeding behind the abdominal cavity - this is a medical emergency.",
    requiredSymptoms: ["back_pain", "dizziness"],
    severity: "emergency",
  },
  {
    name: "Pseudoaneurysm",
    description: "A bulge in the artery wall at the procedure site - requires immediate evaluation.",
    requiredSymptoms: ["lump", "pulsating"],
    severity: "emergency",
  },
];

export default function SymptomChecker() {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const detectCriticalCondition = (): CriticalCondition | null => {
    for (const condition of criticalCombinations) {
      const hasAllSymptoms = condition.requiredSymptoms.every((symptom) =>
        selectedSymptoms.includes(symptom)
      );
      if (hasAllSymptoms) {
        return condition;
      }
    }
    return null;
  };

  const handleSubmit = () => {
    const criticalCondition = detectCriticalCondition();

    if (criticalCondition) {
      navigate("/results", {
        state: {
          status: criticalCondition.severity,
          condition: criticalCondition.name,
          conditionDescription: criticalCondition.description,
        },
      });
      return;
    }

    // Check for individual emergency symptoms
    const hasEmergency = symptoms
      .filter((s) => s.severity === "emergency")
      .some((s) => selectedSymptoms.includes(s.id));

    if (hasEmergency) {
      navigate("/results", { state: { status: "emergency" } });
      return;
    }

    // Check for urgent symptoms
    const hasUrgent = symptoms
      .filter((s) => s.severity === "urgent")
      .some((s) => selectedSymptoms.includes(s.id));

    if (hasUrgent) {
      navigate("/results", { state: { status: "urgent" } });
      return;
    }

    navigate("/results", { state: { status: "normal" } });
  };

  const criticalCondition = detectCriticalCondition();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-8 flex flex-col">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
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
          <p className="text-muted-foreground mt-1">
            Select all symptoms you are currently experiencing
          </p>
        </header>

        {/* Critical Condition Alert */}
        {criticalCondition && (
          <Card className="mb-4 border-2 border-status-emergency bg-status-emergency-bg">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-status-emergency flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-status-emergency">
                    Critical Combination Detected
                  </h3>
                  <p className="text-sm text-foreground mt-1">
                    <strong>{criticalCondition.name}:</strong>{" "}
                    {criticalCondition.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Symptom Checklist */}
        <Card className="flex-1 border-2 border-border">
          <CardContent className="p-6">
            <div className="space-y-4">
              {symptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                    selectedSymptoms.includes(symptom.id)
                      ? "border-clinical bg-clinical/5"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                  onClick={() => toggleSymptom(symptom.id)}
                >
                  <Checkbox
                    id={symptom.id}
                    checked={selectedSymptoms.includes(symptom.id)}
                    onCheckedChange={() => toggleSymptom(symptom.id)}
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor={symptom.id}
                    className="text-base font-medium text-foreground cursor-pointer leading-relaxed"
                  >
                    {symptom.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className={`mt-6 w-full h-16 text-xl font-semibold shadow-lg ${
            criticalCondition
              ? "bg-status-emergency hover:bg-status-emergency/90"
              : "bg-clinical hover:bg-clinical-dark"
          } text-white`}
        >
          {criticalCondition ? "Get Emergency Guidance" : "Check My Symptoms"}
        </Button>

        {selectedSymptoms.length === 0 && (
          <p className="text-center text-muted-foreground text-sm mt-4">
            If you have no symptoms, tap "Check My Symptoms" to confirm recovery is on track.
          </p>
        )}
      </div>
    </div>
  );
}
