import { useAuth } from "@/hooks/use.auth";
import { useMyApplications } from "@/hooks/use-applications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Search,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { data, isLoading } = useMyApplications();

  /* ---------------- SAFE DATA ---------------- */

  const applications = Array.isArray(data)
    ? data.filter(
        (a) =>
          a &&
          typeof a === "object" &&
          a.id &&
          a.status &&
          a.internship &&
          typeof a.internship === "object" &&
          a.internship.title &&
          a.internship.companyName
      )
    : [];

  const pending = applications.filter((a) => a.status === "APPLIED").length;
  const approved = applications.filter((a) => a.status === "APPROVED").length;
  const rejected = applications.filter((a) => a.status === "REJECTED").length;

  const username =
    user?.email?.split("@")[0] ?? "Student";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Section */}
      <section className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Welcome back, {username}!
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Track your applications and discover new opportunities.
        </p>

        <div className="mt-6 flex gap-4">
          <Link href="/internships">
            <Button size="lg">
              <Search className="mr-2 h-4 w-4" />
              Browse Internships
            </Button>
          </Link>

          <Link href="/applications">
            <Button variant="outline" size="lg">
              View My Applications
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Pending Applications"
          value={pending}
          icon={<Clock className="h-4 w-4 text-orange-500" />}
          loading={isLoading}
          subtitle="Awaiting review"
        />
        <StatCard
          title="Interviews / Offers"
          value={approved}
          icon={<CheckCircle className="h-4 w-4 text-green-500" />}
          loading={isLoading}
          subtitle="Action required"
        />
        <StatCard
          title="Rejected"
          value={rejected}
          icon={<XCircle className="h-4 w-4 text-red-500" />}
          loading={isLoading}
          subtitle="Don't give up!"
        />
      </div>

      {/* Recent Applications */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Applications</h2>
          <Link href="/applications">
            <Button variant="link">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : applications.length > 0 ? (
          <div className="grid gap-4">
            {applications.slice(0, 3).map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-4 bg-card rounded-xl border"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {app.internship.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {app.internship.companyName}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    app.status === "APPROVED"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : app.status === "REJECTED"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-orange-50 text-orange-700 border-orange-200"
                  }`}
                >
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center border-dashed">
            <div className="mx-auto h-12 w-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium">No applications yet</h3>
            <p className="text-muted-foreground mb-4">
              Start applying to internships to see activity here.
            </p>
            <Link href="/internships">
              <Button>Explore Jobs</Button>
            </Link>
          </Card>
        )}
      </section>
    </div>
  );
}

/* ---------------- SMALL HELPER ---------------- */

function StatCard({
  title,
  value,
  icon,
  subtitle,
  loading,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  subtitle: string;
  loading: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
