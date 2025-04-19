
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from "@/types";

interface PublicImpactDashboardProps {
  data?: {
    stats: ChartData[];
    selectedProjects: string[];
  };
}

export function PublicImpactDashboard({ data }: PublicImpactDashboardProps) {
  if (!data || data.stats.length === 0) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Our Impact</h2>
          <p className="text-center text-muted-foreground">No impact data available at this time.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.stats.map((stat, index) => (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">{stat.datasets[0].label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {stat.datasets[0].label.includes("Budget") 
                    ? new Intl.NumberFormat('en-US', { 
                        style: 'currency', 
                        currency: 'USD',
                        maximumFractionDigits: 0 
                      }).format(Number(stat.datasets[0].data[0]))
                    : stat.datasets[0].data[0]}
                </div>
                <p className="text-muted-foreground">{stat.labels[0]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
