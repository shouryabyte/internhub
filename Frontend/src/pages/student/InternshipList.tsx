import { useInternships } from "@/hooks/use-internships";
import { useMyApplications, useApplyInternship } from "@/hooks/use-applications";
import InternshipCard from "@/components/dashboard/InternshipCard";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function InternshipList() {
  const { data: internships = [], isLoading } = useInternships();
  const { data: applications = [] } = useMyApplications();
  const applyMutation = useApplyInternship();

  // ✅ CORRECT SOURCE OF TRUTH
  const appliedIds = new Set(
    applications.map((a: any) => a.internship?._id)
  );

  if (isLoading) {
    return <div>Loading internships...</div>;
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Browse Internships</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {internships.map((internship: any) => (
          <InternshipCard
            key={internship._id}
            internship={internship}
            isApplied={appliedIds.has(internship._id)}
            isApplying={applyMutation.isPending}
            onApply={() => applyMutation.mutate(internship._id)}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
