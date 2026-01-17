import { useState } from "react";
import { useInternships, useCreateInternship } from "@/hooks/use-internships";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Briefcase,
  Building2,
  Link2,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/* =========================
   Schema
========================= */
const createInternshipSchema = z.object({
  title: z.string().min(1),
  companyName: z.string().min(1),
  jobId: z.string().min(1),
  applyLink: z.string().url(),
  description: z.string().min(10),
});

type CreateFormValues = z.infer<typeof createInternshipSchema>;

export default function ManageInternships() {
  const { data: internships, isLoading } = useInternships();
  const { mutateAsync: createInternship, isPending } =
    useCreateInternship();

  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<CreateFormValues>({
    resolver: zodResolver(createInternshipSchema),
    defaultValues: {
      title: "",
      companyName: "",
      jobId: "",
      applyLink: "",
      description: "",
    },
  });

  const onSubmit = async (data: CreateFormValues) => {
    try {
      await createInternship(data);
      toast({
        title: "Internship created",
        description: "Listing published successfully",
      });
      setOpen(false);
      form.reset();
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create internship",
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Internships</h1>
          <p className="text-muted-foreground">
            Add and manage job listings.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Internship
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Post New Internship</DialogTitle>
            </DialogHeader>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <Input placeholder="Job ID" {...form.register("jobId")} />
              <Input placeholder="Company" {...form.register("companyName")} />
              <Input placeholder="Title" {...form.register("title")} />
              <Input placeholder="Apply link" {...form.register("applyLink")} />
              <Textarea
                placeholder="Description"
                {...form.register("description")}
              />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* List */}
      {isLoading ? (
        <p>Loading internships…</p>
      ) : (
        <div className="space-y-4">
          {internships?.map((internship) => (
            <Card
              key={internship._id}   // ✅ FIXED
              className="hover:border-primary/40"
            >
              <CardContent className="p-6 flex justify-between">
                <div className="flex gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                    <Briefcase className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {internship.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Building2 className="h-3 w-3" />
                      {internship.companyName}
                      <span className="text-xs bg-muted px-2 rounded">
                        ID: {internship.jobId}
                      </span>
                    </p>
                  </div>
                </div>

                <a
                  href={internship.applyLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="ghost" size="sm">
                    <Link2 className="h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
