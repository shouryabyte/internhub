import {
  useAllApplications,
  useUpdateApplicationStatus,
} from "@/hooks/use-applications";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminApplications() {
  const { data: applications, isLoading } = useAllApplications();
  const { mutate: updateStatus, isPending } = useUpdateApplicationStatus();
  const { toast } = useToast();

  const handleStatusUpdate = (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    updateStatus(
      { id, status },
      {
        onSuccess: () =>
          toast({
            title: "Updated",
            description: `Application marked as ${status}`,
          }),
        onError: () =>
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to update status",
          }),
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Applications Review</h1>
        <p className="text-muted-foreground">
          Review and manage student applications.
        </p>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Internship</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading applications...
                </TableCell>
              </TableRow>
            ) : applications?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No applications found.
                </TableCell>
              </TableRow>
            ) : (
              (Array.isArray(applications) ? applications : []).map((app) => (
                <TableRow key={app._id}>
                  <TableCell className="font-medium">
                    {app.student?.email}
                  </TableCell>

                  <TableCell>{app.internship?.title}</TableCell>

                  <TableCell>{app.internship?.companyName}</TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        app.status === "APPROVED"
                          ? "default"
                          : app.status === "REJECTED"
                          ? "destructive"
                          : "secondary"
                      }
                      className={
                        app.status === "APPROVED" ? "bg-green-600" : ""
                      }
                    >
                      {app.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    {app.status === "APPLIED" && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-green-600 hover:bg-green-50"
                          disabled={isPending}
                          onClick={() =>
                            handleStatusUpdate(app._id, "APPROVED")
                          }
                        >
                          <Check className="h-4 w-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:bg-red-50"
                          disabled={isPending}
                          onClick={() =>
                            handleStatusUpdate(app._id, "REJECTED")
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
