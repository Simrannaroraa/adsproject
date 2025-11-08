import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Sparkles, Star, Bookmark, BookmarkCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Recommendation {
  title: string;
  year: string;
  rating: string;
  summary: string;
}

const Recommendations = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    type: "",
    genre: "",
    language: "",
    years: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user) {
      loadSavedContent();
    }
  }, [user]);

  const loadSavedContent = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("saved_content")
      .select("title, year");

    if (error) {
      console.error("Error loading saved content:", error);
      return;
    }

    const saved = new Set(data.map((item) => `${item.title}-${item.year}`));
    setSavedIds(saved);
  };

  const toggleSave = async (rec: Recommendation) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save recommendations",
        variant: "destructive",
      });
      return;
    }

    const itemId = `${rec.title}-${rec.year}`;
    const isSaved = savedIds.has(itemId);

    try {
      // Get Firebase user ID
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      const userId = supabaseUser?.id || user.email; // Fallback to email if no Supabase user

      if (isSaved) {
        const { error } = await supabase
          .from("saved_content")
          .delete()
          .eq("title", rec.title)
          .eq("year", rec.year);

        if (error) throw error;

        setSavedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });

        toast({
          title: "Removed",
          description: "Removed from your saved list",
        });
      } else {
        const { error } = await supabase.from("saved_content").insert({
          user_id: userId as string,
          title: rec.title,
          year: rec.year,
          rating: rec.rating,
          summary: rec.summary,
        });

        if (error) throw error;

        setSavedIds((prev) => new Set(prev).add(itemId));

        toast({
          title: "Saved!",
          description: "Added to your saved list",
        });
      }
    } catch (error) {
      console.error("Error toggling save:", error);
      toast({
        title: "Error",
        description: "Failed to update saved status",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendations([]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-recommendations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            type: formData.type,
            genre: formData.genre,
            language: formData.language,
            years: formData.years,
            description: formData.description,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        
        if (response.status === 429) {
          throw new Error("Too many requests. Please try again in a moment.");
        }
        if (response.status === 402) {
          throw new Error("AI usage limit reached. Please contact support.");
        }
        
        throw new Error(errorData.error || "Failed to get recommendations");
      }

      const data = await response.json();
      
      if (!data.recommendations || data.recommendations.length === 0) {
        throw new Error("No recommendations received");
      }
      
      setRecommendations(data.recommendations);
      
      toast({
        title: "Recommendations Ready!",
        description: `Found ${data.recommendations.length} recommendations for you`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">AI-Powered Recommendations</h1>
          <p className="text-muted-foreground text-lg">
            Get personalized Netflix recommendations 
          </p>
        </div>

        {/* Form */}
        <Card className="mb-12 animate-fade-in border-border shadow-netflix">
          <CardHeader>
            <CardTitle>Your Preferences</CardTitle>
            <CardDescription>Tell us what you're looking for</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Movie">Movie</SelectItem>
                      <SelectItem value="TV Show">TV Show</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    id="genre"
                    type="text"
                    placeholder="e.g., Action, Thriller, Comedy"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    required
                    className="bg-input border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    type="text"
                    placeholder="e.g., English, Hindi"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    required
                    className="bg-input border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="years">Released Within (years)</Label>
                  <Input
                    id="years"
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.years}
                    onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                    required
                    min="1"
                    className="bg-input border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mood / Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you're in the mood for..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="bg-input border-border min-h-24"
                />
              </div>

              <Button type="submit" variant="netflix" className="w-full" disabled={isLoading}>
                {isLoading ? "Getting Recommendations..." : "Get Recommendations"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-6">
                  <div className="animate-shimmer bg-gradient-to-r from-muted via-muted-foreground/20 to-muted h-6 rounded mb-3" />
                  <div className="animate-shimmer bg-gradient-to-r from-muted via-muted-foreground/20 to-muted h-4 rounded mb-2" />
                  <div className="animate-shimmer bg-gradient-to-r from-muted via-muted-foreground/20 to-muted h-4 rounded mb-4" />
                  <div className="animate-shimmer bg-gradient-to-r from-muted via-muted-foreground/20 to-muted h-20 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Results */}
        {!isLoading && recommendations.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <Card
                key={index}
                className="border-border hover:border-primary transition-all hover:scale-105 animate-fade-in shadow-netflix"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl">{rec.title}</CardTitle>
                    <div className="flex gap-2 flex-shrink-0">
                      <Star className="h-5 w-5 text-primary" />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleSave(rec)}
                        className="h-8 w-8 p-0"
                      >
                        {savedIds.has(`${rec.title}-${rec.year}`) ? (
                          <BookmarkCheck className="h-5 w-5 text-primary" />
                        ) : (
                          <Bookmark className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    <div className="flex gap-3 text-sm">
                      <span>📅 {rec.year}</span>
                      <span>⭐ {rec.rating}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{rec.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && recommendations.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Submit your preferences to get AI-powered recommendations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
