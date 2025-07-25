// components/charts/HeavyChart.tsx - Complex chart component
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Activity, Code } from "lucide-react";

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface HeavyChartProps {
  title?: string;
  data?: ChartData[];
  type?: "skills" | "projects" | "activity";
}

export default function HeavyChart({
  title = "Skills Progress",
  data,
  type = "skills",
}: HeavyChartProps) {
  const [animatedData, setAnimatedData] = useState<ChartData[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Default data based on type
  const defaultData: Record<string, ChartData[]> = {
    skills: [
      { label: "JavaScript", value: 95, color: "#f7df1e" },
      { label: "TypeScript", value: 90, color: "#3178c6" },
      { label: "React", value: 92, color: "#61dafb" },
      { label: "Next.js", value: 88, color: "#000000" },
      { label: "Node.js", value: 85, color: "#339933" },
      { label: "PostgreSQL", value: 80, color: "#336791" },
      { label: "Tailwind CSS", value: 90, color: "#06b6d4" },
      { label: "Python", value: 75, color: "#3776ab" },
    ],
    projects: [
      { label: "E-Commerce", value: 100, color: "#10b981" },
      { label: "Chat App", value: 85, color: "#3b82f6" },
      { label: "Dashboard", value: 90, color: "#8b5cf6" },
      { label: "Portfolio", value: 95, color: "#f59e0b" },
      { label: "API Server", value: 80, color: "#ef4444" },
    ],
    activity: [
      { label: "Jan", value: 65, color: "#3b82f6" },
      { label: "Feb", value: 78, color: "#3b82f6" },
      { label: "Mar", value: 82, color: "#3b82f6" },
      { label: "Apr", value: 90, color: "#3b82f6" },
      { label: "May", value: 88, color: "#3b82f6" },
      { label: "Jun", value: 95, color: "#3b82f6" },
    ],
  };

  const chartData = data || defaultData[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setAnimatedData(chartData);
    }, 300);

    return () => clearTimeout(timer);
  }, [chartData]);

  const maxValue = Math.max(...chartData.map((d) => d.value));

  const getIcon = () => {
    switch (type) {
      case "skills":
        return <Code size={20} />;
      case "projects":
        return <BarChart3 size={20} />;
      case "activity":
        return <Activity size={20} />;
      default:
        return <TrendingUp size={20} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full bg-white rounded-2xl shadow-soft border border-gray-100 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
            {getIcon()}
          </div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>

        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-primary-600"
        >
          <TrendingUp size={24} />
        </motion.div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {animatedData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group"
          >
            {/* Label and Value */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                {item.label}
              </span>
              <span className="text-sm font-bold text-gray-900">
                {item.value}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{
                  width: isVisible ? `${(item.value / maxValue) * 100}%` : 0,
                }}
                transition={{
                  delay: index * 0.1 + 0.2,
                  duration: 1,
                  ease: "easeOut",
                }}
              />

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  delay: index * 0.1 + 1,
                }}
                style={{ width: "30%" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-6 pt-4 border-t border-gray-100"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary-600">
              {Math.round(
                chartData.reduce((acc, item) => acc + item.value, 0) /
                  chartData.length
              )}
              %
            </div>
            <div className="text-xs text-gray-500">Average</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {Math.max(...chartData.map((d) => d.value))}%
            </div>
            <div className="text-xs text-gray-500">Highest</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-700">
              {chartData.length}
            </div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
