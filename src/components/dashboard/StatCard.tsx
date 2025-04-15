
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon: Icon, change, className }: StatCardProps) {
  return (
    <div className={cn("bg-white p-6 rounded-lg shadow-sm border border-gray-100", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  "text-xs font-medium",
                  change.positive ? "text-green-600" : "text-red-600"
                )}
              >
                {change.positive ? "+" : ""}{change.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs. last month</span>
            </div>
          )}
        </div>
        
        <div className="bg-csr-light p-3 rounded-full">
          <Icon className="h-6 w-6 text-csr-primary" />
        </div>
      </div>
    </div>
  );
}
