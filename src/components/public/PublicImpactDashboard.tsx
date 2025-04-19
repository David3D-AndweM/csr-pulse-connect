
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from "@/types";

interface PublicImpactDashboardProps {
  data?: {
    stats: ChartData[];
    selectedProjects: string[];
  };
}

export function PublicImpactDashboard({ data }: PublicImpactDashboardProps) {
  if (!data) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{stat.datasets[0].label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.datasets[0].data[0]}</div>
                <p className="text-muted-foreground">{stat.labels[0]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
