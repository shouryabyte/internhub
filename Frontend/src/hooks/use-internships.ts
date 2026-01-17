import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchInternships, createInternship } from "@/api/internships";
import { useAuth } from "@/hooks/use.auth";

export function useInternships() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["internships"],
    queryFn: fetchInternships,
    enabled: !!token, // 🔥 REQUIRED
  });
}

export function useCreateInternship() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createInternship,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["internships"] });
    },
  });
}
