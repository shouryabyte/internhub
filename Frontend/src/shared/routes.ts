export const api = {
  internships: "/api/internships",
  internshipById: (id: string) => `/api/internships/${id}`,
};

export function buildUrl(path: string) {
  return path;
}
