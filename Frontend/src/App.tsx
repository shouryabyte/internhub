import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/hooks/use.auth";
import { Navbar } from "@/components/layout/Navbar";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

// Auth & Public Pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import NotFound from "@/pages/not-found";

// Student Pages
import StudentDashboard from "@/pages/student/Dashboard";
import InternshipList from "@/pages/student/InternshipList";
import StudentApplications from "@/pages/student/Applications";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManageInternships from "@/pages/admin/ManageInternships";
import AdminApplications from "@/pages/admin/AdminApplications";

function ProtectedRoute({ component: Component, allowedRoles }: { component: any, allowedRoles: string[] }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    } else if (!isLoading && user && !allowedRoles.includes(user.role)) {
      if (user.role === "ADMIN") setLocation("/admin/dashboard");
      else setLocation("/dashboard");
    }
  }, [user, isLoading, allowedRoles, setLocation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Component />
      </main>
    </>
  );
}

function RedirectToLogin() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation("/login");
  }, [setLocation]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* Student Routes */}
      <Route path="/dashboard">
        {() => <ProtectedRoute component={StudentDashboard} allowedRoles={["STUDENT"]} />}
      </Route>
      <Route path="/internships">
        {() => <ProtectedRoute component={InternshipList} allowedRoles={["STUDENT"]} />}
      </Route>
      <Route path="/applications">
        {() => <ProtectedRoute component={StudentApplications} allowedRoles={["STUDENT"]} />}
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/dashboard">
        {() => <ProtectedRoute component={AdminDashboard} allowedRoles={["ADMIN"]} />}
      </Route>
      <Route path="/admin/internships">
        {() => <ProtectedRoute component={ManageInternships} allowedRoles={["ADMIN"]} />}
      </Route>
      <Route path="/admin/applications">
        {() => <ProtectedRoute component={AdminApplications} allowedRoles={["ADMIN"]} />}
      </Route>

      <Route path="/" component={RedirectToLogin} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
