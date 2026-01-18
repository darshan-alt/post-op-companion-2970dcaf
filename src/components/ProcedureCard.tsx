import { Heart, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProcedureCardProps {
  procedure: string;
  date: string;
  daysSince: number;
}

export function ProcedureCard({ procedure, date, daysSince }: ProcedureCardProps) {
  return (
    <Card className="border-2 border-clinical-light bg-card shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-clinical-light">
            <Heart className="h-6 w-6 text-clinical" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Your Procedure</h2>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-foreground">
            <Heart className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{procedure}</span>
          </div>
          
          <div className="flex items-center gap-3 text-foreground">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span className="text-clinical font-semibold">
              {daysSince} days since procedure
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
