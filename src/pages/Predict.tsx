import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Film, Sparkles } from "lucide-react";

interface PredictionResult {
  prediction: string;
  details: string;
}

const Predict = () => {
  const [formData, setFormData] = useState({
    genre: "",
    duration: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genre: formData.genre,
          duration: parseInt(formData.duration),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || "Failed to get prediction");
      }

      const data = await response.json();
      setResult(data);
      
      toast({
        title: "Prediction Complete!",
        description: `Rating: ${data.prediction}`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast({
        title: "Backend Error",
        description: errorMessage.includes("Failed to fetch") 
          ? "Cannot connect to Flask server. Ensure it's running on http://127.0.0.1:5000"
          : errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Predict Netflix Content Rating</h1>
          <p className="text-muted-foreground text-lg">
            Enter content details to predict the appropriate audience rating
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Card */}
          <Card className="animate-fade-in border-border shadow-netflix">
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
              <CardDescription>Provide information about the content</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    id="genre"
                    type="text"
                    placeholder="e.g., Comedy, Action, Drama"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    required
                    className="bg-input border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="e.g., 120"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                    min="1"
                    className="bg-input border-border"
                  />
                </div>

                <Button type="submit" variant="netflix" className="w-full" disabled={isLoading}>
                  {isLoading ? "Predicting..." : "Predict Rating"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Result Card */}
          <Card className="animate-fade-in border-border shadow-netflix" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Prediction Result</CardTitle>
              <CardDescription>AI-powered rating classification</CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6 animate-scale-in">
                  <div className="bg-gradient-card rounded-lg p-6 border border-primary text-center">
                    <Sparkles className="h-10 w-10 text-primary mx-auto mb-3" />
                    <h3 className="text-3xl font-bold text-primary mb-2">
                      {result.prediction}
                    </h3>
                    <p className="text-muted-foreground">Predicted Content Rating</p>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Details</h4>
                    <p className="text-sm text-muted-foreground">
                      {result.details}
                    </p>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4 text-sm">
                    <p className="text-muted-foreground">
                      This rating was predicted using a RandomForestClassifier trained on Netflix's content dataset.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Film className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Submit the form to see prediction results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Predict;
