import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <SEO
        title="Page Not Found"
        description="This page does not exist or has been moved."
        noindex
      />
      <div className="text-center max-w-md space-y-4">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-3xl font-bold text-foreground">Page not found</h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist, has been moved, or is no longer
          part of the catalogue.
        </p>
        <div className="flex gap-2 justify-center pt-2">
          <Button asChild>
            <Link to="/products">Browse products</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
