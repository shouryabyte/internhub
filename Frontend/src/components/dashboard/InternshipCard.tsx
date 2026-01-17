import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, ExternalLink } from "lucide-react";

interface Props {
  internship: any;
  isApplied: boolean;
  isApplying: boolean;
  onApply: () => void;
}

export default function InternshipCard({
  internship,
  isApplied,
  isApplying,
  onApply,
}: Props) {
  return (
    <div className="border rounded-xl p-5 bg-card space-y-4 hover:shadow-md transition">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h3 className="font-semibold">{internship.title}</h3>
            <p className="text-sm text-muted-foreground">
              {internship.companyName}
            </p>
          </div>
        </div>

        {isApplied && (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            ✓ Applied
          </Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2">
        {internship.description}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {isApplied ? (
          <Button disabled variant="outline" className="w-full">
            Applied
          </Button>
        ) : (
          <Button
            className="w-full"
            disabled={isApplying}
            onClick={onApply}
          >
            {isApplying ? "Applying..." : "Quick Apply"}
          </Button>
        )}

        {internship.applyLink && (
          <a
            href={internship.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border rounded-lg hover:bg-muted"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
