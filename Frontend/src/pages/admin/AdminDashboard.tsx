import { useAllApplications } from "@/hooks/use-applications";
import { useInternships } from "@/hooks/use-internships";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, FileCheck, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const { data: applications = [], isLoading: appsLoading } = useAllApplications();
  const { data: internships = [], isLoading: jobsLoading } = useInternships();

  const totalApplications = applications.length;
  const totalJobs = internships.length;

  const pendingApps = applications.filter(
    (a) => a.status === "APPLIED"
  ).length;

  const approvedApps = applications.filter(
    (a) => a.status === "APPROVED"
  ).length;

  const approvalRate =
    totalApplications > 0
      ? Math.round((approvedApps / totalApplications) * 100)
      : 0;

  const StatCard = ({ title, value, icon: Icon, loading, color }: any) => (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-3xl font-bold">Admin Overview</h1>
        <p className="text-muted-foreground">
          Monitor platform activity and metrics.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={totalApplications}
          icon={FileCheck}
          loading={appsLoading}
          color="text-blue-500"
        />
        <StatCard
          title="Active Internships"
          value={totalJobs}
          icon={Briefcase}
          loading={jobsLoading}
          color="text-indigo-500"
        />
        <StatCard
          title="Pending Review"
          value={pendingApps}
          icon={Users}
          loading={appsLoading}
          color="text-orange-500"
        />
        <StatCard
          title="Approval Rate"
          value={`${approvalRate}%`}
          icon={TrendingUp}
          loading={appsLoading}
          color="text-green-500"
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {appsLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : applications.length > 0 ? (
            <div className="space-y-4">
              {applications.slice(0, 5).map((app) => (
                <div
                  key={app._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium text-sm">
                      {app.student?.email ?? "Unknown user"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Applied to {app.internship?.title}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      app.status === "APPLIED"
                        ? "bg-orange-100 text-orange-800"
                        : app.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              No recent activity.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
