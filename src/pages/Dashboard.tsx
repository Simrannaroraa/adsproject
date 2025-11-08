import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, TrendingUp, Film } from "lucide-react";
import { BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Dashboard = () => {
  // Sample data for visualization
  const genreData = [
    { name: "Drama", count: 2450 },
    { name: "Comedy", count: 1890 },
    { name: "Action", count: 1560 },
    { name: "Thriller", count: 1320 },
    { name: "Documentary", count: 980 },
    { name: "Horror", count: 850 },
  ];

  const ratingData = [
    { name: "Kids (G, TV-Y)", value: 15, color: "#10B981" },
    { name: "Teen (PG-13, TV-14)", value: 45, color: "#F59E0B" },
    { name: "Adult (R, TV-MA)", value: 40, color: "#E50914" },
  ];

  const countryData = [
    { name: "USA", count: 3200 },
    { name: "India", count: 1850 },
    { name: "UK", count: 1240 },
    { name: "Japan", count: 980 },
    { name: "South Korea", count: 760 },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Netflix content insights and statistics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="border-border animate-fade-in shadow-netflix">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Content</CardTitle>
              <Film className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,807</div>
              <p className="text-xs text-muted-foreground">Movies & TV Shows</p>
            </CardContent>
          </Card>

          <Card className="border-border animate-fade-in shadow-netflix" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Movies</CardTitle>
              <Film className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6,131</div>
              <p className="text-xs text-muted-foreground">69.6% of content</p>
            </CardContent>
          </Card>

          <Card className="border-border animate-fade-in shadow-netflix" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">TV Shows</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,676</div>
              <p className="text-xs text-muted-foreground">30.4% of content</p>
            </CardContent>
          </Card>

          <Card className="border-border animate-fade-in shadow-netflix" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Countries</CardTitle>
              <PieChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">123</div>
              <p className="text-xs text-muted-foreground">Total countries</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Genre Distribution */}
          <Card className="border-border animate-fade-in shadow-netflix">
            <CardHeader>
              <CardTitle>Content by Genre</CardTitle>
              <CardDescription>Number of titles per genre</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={genreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Rating Distribution */}
          <Card className="border-border animate-fade-in shadow-netflix" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
              <CardDescription>Content classification by age rating</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={ratingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ratingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Countries */}
          <Card className="border-border animate-fade-in shadow-netflix md:col-span-2" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle>Top Content Producing Countries</CardTitle>
              <CardDescription>Countries with most Netflix content</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={countryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--accent))" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
