import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import InternshipCard from "@/components/dashboard/InternshipCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useInternships } from "@/hooks/use-internships";
import { Skeleton } from "@/components/ui/skeleton";

const Internships: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  // ✅ Track applied internships locally
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());

  const { data, isLoading } = useInternships();

  const internships = Array.isArray(data)
    ? data.filter(
        (i) =>
          i &&
          i.id &&
          i.title &&
          i.company &&
          i.company.name
      )
    : [];

  const filtered = internships.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleApply = (id: string) => {
    if (appliedIds.has(id)) return;

    setAppliedIds((prev) => new Set(prev).add(id));

    toast({
      title: "Applied successfully",
      description: "Your application has been submitted",
    });
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-1">Browse Internships</h1>
      <p className="text-muted-foreground mb-6">
        Find the perfect role to kickstart your career
      </p>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search roles or companies..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-muted-foreground mt-20">
          No internships found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              applied={appliedIds.has(internship.id)}
              onApply={() => handleApply(internship.id)}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Internships;
