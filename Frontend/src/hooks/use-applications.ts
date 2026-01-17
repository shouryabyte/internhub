import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";

/* =========================
   STUDENT: My Applications
========================= */
export const useMyApplications = () => {
  return useQuery({
    queryKey: ["my-applications"],
    queryFn: async () => {
      const res = await api.get("/api/applications/me");
      return res.data;
    },
  });
};

/* =========================
   ADMIN: All Applications
========================= */
export const useAllApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await api.get("/api/applications");
      return res.data;
    },
  });
};

/* =========================
   STUDENT: Apply Internship ✅ FIXED
========================= */
export const useApplyInternship = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (internshipId: string) => {
      const res = await api.post("/api/applications", { internshipId });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};

/* =========================
   ADMIN: Update Status
========================= */
export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "APPROVED" | "REJECTED";
    }) => {
      const res = await api.patch(`/api/applications/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};
