import { useMyApplications } from "@/hooks/use-applications";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, ExternalLink } from "lucide-react";

export default function StudentApplications() {
  const { data: applications = [], isLoading } = useMyApplications();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-100 text-green-700">Approved</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return (
          <Badge className="bg-orange-100 text-orange-700">
            Applied
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-4xl mx-auto">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto text-center py-12">
        <CardContent>
          <p className="text-muted-foreground">
            You haven't applied to any internships yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">My Applications</h1>

      {applications.map((app: any) => {
        // 🔒 SAFETY GUARD
        if (!app.internship) {
          return (
            <Card key={app._id} className="border-dashed">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">
                  ⚠ Internship no longer available (removed by admin)
                </p>
                {getStatusBadge(app.status)}
              </CardContent>
            </Card>
          );
        }

        return (
          <Card key={app._id} className="hover:shadow-md transition">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 flex-grow space-y-3">
                <div className="flex justify-between">
                  <Badge variant="outline" className="text-xs">
                    ID: {app.internship.jobId}
                  </Badge>
                  {getStatusBadge(app.status)}
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {app.internship.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {app.internship.companyName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t md:border-t-0 md:border-l flex items-center">
                {app.internship.applyLink && (
                  <a
                    href={app.internship.applyLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      View Original <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
