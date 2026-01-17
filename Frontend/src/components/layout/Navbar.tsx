import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use.auth";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, Briefcase, FileCheck, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const isAdmin = user.role === "ADMIN";

  const studentLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/internships", label: "Internships", icon: Briefcase },
    { href: "/applications", label: "My Applications", icon: FileCheck },
  ];

  const adminLinks = [
    { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/internships", label: "Manage Jobs", icon: Briefcase },
    { href: "/admin/applications", label: "Applications", icon: FileCheck },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  const NavContent = ({ mobile = false }) => (
    <div className={`flex ${mobile ? 'flex-col space-y-4' : 'items-center space-x-6'}`}>
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = location === link.href;
        return (
          <Link key={link.href} href={link.href}>
            <div 
              className={`
                flex items-center space-x-2 cursor-pointer transition-colors duration-200
                ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'}
              `}
              onClick={() => mobile && setIsOpen(false)}
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </div>
          </Link>
        );
      })}
      
      <div className={mobile ? 'pt-4 border-t' : 'ml-4 pl-4 border-l border-border'}>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            logout();
            setIsOpen(false);
          }}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href={isAdmin ? "/admin/dashboard" : "/dashboard"}>
              <div className="cursor-pointer">
                <h1 className="text-2xl font-display font-bold text-primary tracking-tight">
                  Intern<span className="text-foreground">Space</span>
                </h1>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex">
            <NavContent />
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-8">
                  <NavContent mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
