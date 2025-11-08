import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Netflix AI
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              
              {user && (
                <>
                  <Link
                    to="/predict"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/predict") ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    Predict Rating
                  </Link>
                  <Link
                    to="/recommendations"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/recommendations") ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    Get Recommendations
                  </Link>
                  <Link
                    to="/dashboard"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    Dashboard
                  </Link>
                </>
              )}
              
              <Link
                to="/about"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/about") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                About
              </Link>

              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
                  <Button onClick={logout} variant="outline" size="sm">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/auth?mode=signin">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button variant="netflix" size="sm">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
