
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from "@/types";

interface ProjectsChartProps {
  data: ChartData;
  title: string;
}

export function ProjectsChart({ data, title }: ProjectsChartProps) {
  const maxValue = Math.max(...data.datasets[0].data);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex flex-col">
          <div className="flex-1 flex items-end gap-4">
            {data.labels.map((label, index) => {
              const value = data.datasets[0].data[index];
              const height = (value / maxValue) * 100;
              const bgColor = Array.isArray(data.datasets[0].backgroundColor) 
                ? data.datasets[0].backgroundColor[index] 
                : data.datasets[0].backgroundColor || '#1e8a5f';
                
              return (
                <div key={label} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center items-end h-[150px]">
                    <div 
                      className="w-8 rounded-t-md" 
                      style={{ 
                        height: `${height}%`, 
                        backgroundColor: bgColor
                      }}
                    ></div>
                  </div>
                  <div className="text-xs mt-2 text-gray-600 text-center">{label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
