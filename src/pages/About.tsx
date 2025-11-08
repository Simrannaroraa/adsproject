import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Users, Database, Brain, Code, Rocket } from "lucide-react";

const About = () => {
  const projectDetails = [
    { label: "Project Title", value: "Netflix Rating Predictor & Recommendation System", icon: Info },
    // { label: "Team Members", value: "Final Year CS/ML Students", icon: Users },
    { label: "Dataset Used", value: "netflix_titles.csv from Kaggle", icon: Database },
    { label: "Model Used", value: "RandomForestClassifier from sklearn.ensemble", icon: Brain },
    { label: "Libraries", value: "Scikit-Learn, Pandas, Requests, TanStack Query", icon: Code },
    { label: "API Integrated", value: "Google Gemini API for AI recommendations", icon: Rocket },
    { label: "Output", value: "Predicted content rating and 5 AI-powered recommendations", icon: Info },
  //   { label: "Deployment", value: "Flask backend (localhost:5000) and React frontend", icon: Rocket },
  ];

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-hero">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About the Project</h1>
        </div>

        {/* Main Project Info Card */}
        <Card className="mb-8 border-border shadow-netflix animate-fade-in">
          <CardHeader className="text-center bg-gradient-card">
            <CardTitle className="text-3xl font-bold text-primary">
              Netflix Rating Predictor & Recommendation System
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {projectDetails.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-card/50 rounded-lg border border-border hover:border-primary transition-all animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                        {detail.label}
                      </h3>
                      <p className="text-foreground">{detail.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Additional Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-border shadow-netflix animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>ML-based content rating prediction (Kids/Teen/Adult)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Supabase AI integration for recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Interactive analytics dashboard with visualizations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>User authentication and protected routes</span>
                </li>
                {/* Multilingual support removed */}
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Responsive design with Netflix-inspired UI</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border shadow-netflix animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-6 w-6 text-primary" />
                Problem Statment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Need for an AI-powered, user-friendly movie recommendation system .</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Implement collaborative filtering for personalized recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Accept user input like genre, release year, and type (movie/show).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Use AI  to improve recommendation accuracy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Provide an interactive frontend for seamless prediction and viewing experience.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Technical Stack */}
        <Card className="mt-6 border-border shadow-netflix animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-center justify-center">
              <Code className="h-6 w-6 text-primary" />
              Technical Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gradient-card rounded-lg border border-border">
                <h3 className="font-bold text-lg mb-3 text-primary">Backend</h3>
                <ul className="space-y-2 text-sm">
                  <li>Flask REST API</li>
                  <li>Scikit-Learn ML</li>
                  <li>Pandas Data Processing</li>
                  <li>Supabase API</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-card rounded-lg border border-border">
                <h3 className="font-bold text-lg mb-3 text-primary">Frontend</h3>
                <ul className="space-y-2 text-sm">
                  <li>React</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Recharts</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-card rounded-lg border border-border">
                <h3 className="font-bold text-lg mb-3 text-primary">Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>Authentication System</li>
                  <li>Protected Routes</li>
                  <li>Real-time Predictions</li>
                  <li>Data Visualization</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
