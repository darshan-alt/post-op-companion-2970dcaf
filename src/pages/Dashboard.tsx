import { useNavigate } from "react-router-dom";
import { BookOpen, Stethoscope } from "lucide-react";
import { ProcedureCard } from "@/components/ProcedureCard";
import { ActionButton } from "@/components/ActionButton";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";

export default function Dashboard() {
  const navigate = useNavigate();
  const patientName = "Sarah";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-8 flex flex-col">
        {/* Header */}
        <header className="mb-8">
          <p className="text-muted-foreground text-sm mb-1">Post-Care Triage</p>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {patientName}
          </h1>
        </header>

        {/* Procedure Card */}
        <ProcedureCard
          procedure="Angioplasty (PCI)"
          date="Jan 15, 2026"
          daysSince={3}
        />

        {/* Action Buttons */}
        <div className="space-y-4 mt-8 flex-1">
          <ActionButton
            icon={BookOpen}
            title="Post-Op Care"
            subtitle="FAQs and recovery guidance"
            onClick={() => navigate("/faq")}
            variant="secondary"
          />
          
          <ActionButton
            icon={Stethoscope}
            title="Symptom Checker"
            subtitle="Start triage assessment"
            onClick={() => navigate("/symptom-checker")}
            variant="primary"
          />
        </div>

        {/* Disclaimer */}
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
