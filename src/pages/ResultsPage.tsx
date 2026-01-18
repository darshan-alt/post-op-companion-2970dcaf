import { useLocation, useNavigate } from "react-router-dom";
import { Phone, AlertTriangle, CheckCircle, Eye, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";

type Status = "emergency" | "urgent" | "normal";

const statusConfig = {
  emergency: {
    title: "EMERGENCY",
    message: "Call 911 or go to the nearest ER immediately.",
    icon: AlertTriangle,
    bgClass: "bg-status-emergency-bg",
    borderClass: "border-status-emergency",
    iconClass: "text-status-emergency",
    titleClass: "text-status-emergency",
    actionLabel: "Call 911",
    actionHref: "tel:911",
  },
  urgent: {
    title: "URGENT",
    message: "Contact your cardiologist or surgical team right now.",
    icon: AlertTriangle,
    bgClass: "bg-status-urgent-bg",
    borderClass: "border-status-urgent",
    iconClass: "text-status-urgent",
    titleClass: "text-status-urgent",
    actionLabel: "Call Doctor",
    actionHref: "tel:+18005551234",
  },
  normal: {
    title: "NORMAL",
    message: "Your recovery appears to be on track.",
    icon: CheckCircle,
    bgClass: "bg-status-normal-bg",
    borderClass: "border-status-normal",
    iconClass: "text-status-normal",
    titleClass: "text-status-normal",
    actionLabel: null,
    actionHref: null,
  },
};

const watchlistItems = [
  "Fainting or loss of consciousness",
  "Slurred speech or confusion",
  "Sudden weakness on one side of the body",
];

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const status: Status = location.state?.status || "normal";
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-8 flex flex-col">
        {/* Status Card */}
        <Card className={`border-4 ${config.borderClass} ${config.bgClass}`}>
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full ${config.bgClass}`}>
                <StatusIcon className={`h-16 w-16 ${config.iconClass}`} />
              </div>
            </div>
            <h1 className={`text-3xl font-bold ${config.titleClass} mb-3`}>
              {config.title}
            </h1>
            <p className="text-xl text-foreground leading-relaxed">
              {config.message}
            </p>

            {config.actionLabel && config.actionHref && (
              <Button
                asChild
                className={`mt-6 w-full h-16 text-xl font-semibold shadow-lg ${
                  status === "emergency"
                    ? "bg-status-emergency hover:bg-status-emergency/90"
                    : "bg-status-urgent hover:bg-status-urgent/90"
                } text-white`}
              >
                <a href={config.actionHref}>
                  <Phone className="h-6 w-6 mr-3" />
                  {config.actionLabel}
                </a>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Watchlist */}
        <Card className="mt-6 border-2 border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-5 w-5 text-clinical" />
              <h2 className="text-lg font-semibold text-foreground">
                Watch for these next
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              If these occur, seek emergency care immediately:
            </p>
            <ul className="space-y-2">
              {watchlistItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-foreground"
                >
                  <div className="w-2 h-2 rounded-full bg-status-urgent mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Back to Dashboard */}
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mt-6 h-14 text-lg border-2"
        >
          <Home className="h-5 w-5 mr-2" />
          Return to Dashboard
        </Button>

        {/* Disclaimer */}
        <div className="mt-auto pt-6">
          <MedicalDisclaimer />
        </div>
      </div>
    </div>
  );
}
