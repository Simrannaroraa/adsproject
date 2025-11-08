import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film, Brain, BarChart3, Info } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574267432644-f74f4e8d69c0?w=1920')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="flex justify-center mb-6">
            </div>
            <h1 className="text-2xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Netflix Rating Predictor & Recommendation System
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powered by Machine Learning and Google Gemini AI. Predict content ratings and discover personalized recommendations instantly.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              {user ? (
                <>
                  <Link to="/predict">
                    <Button variant="hero" size="lg">
                      Predict Rating
                    </Button>
                  </Link>
                  <Link to="/recommendations">
                    <Button variant="outline" size="lg">
                      Get Recommendations
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth?mode=signup">
                    <Button variant="hero" size="lg">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signin">
                    <Button variant="outline" size="lg">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-card rounded-xl p-8 border border-border hover:border-primary transition-all hover:scale-105 animate-fade-in">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">AI Rating Prediction</h3>
              <p className="text-muted-foreground">
                Accurately predict content ratings (Kids/Teen/Adult) using Random Forest ML model trained on Netflix dataset.
              </p>
            </div>

            <div className="bg-gradient-card rounded-xl p-8 border border-border hover:border-primary transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Film className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Supabase API Recommendations</h3>
              <p className="text-muted-foreground">
                Get personalized movie and TV show recommendations powered by Supabase API on your preferences.
              </p>
            </div>

            <div className="bg-gradient-card rounded-xl p-8 border border-border hover:border-primary transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Explore comprehensive analytics including genre distribution, rating statistics, and content trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">ADS Project</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This is a comprehensive machine learning project demonstrating content classification, AI integration, and data analytics.
          </p>
          <Link to="/about">
            <Button variant="netflix" size="lg">
              View Project Details
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
