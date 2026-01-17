import api from "./axios";

export const fetchInternships = async () => {
  const { data } = await api.get("/api/internships");
  return data;
};

export const createInternship = async (payload: any) => {
  const { data } = await api.post("/api/internships", payload);
  return data;
};
