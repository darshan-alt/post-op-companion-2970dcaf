import { AlertTriangle } from "lucide-react";

export function MedicalDisclaimer() {
  return (
    <div className="bg-muted border border-border rounded-lg p-4 mt-auto">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-status-urgent flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Medical Disclaimer:</strong> This is a decision-support tool, not a medical diagnosis. In an emergency, call 911.
        </p>
      </div>
    </div>
  );
}
