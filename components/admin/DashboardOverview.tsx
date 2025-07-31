"use client";
import { motion } from "framer-motion";
import { FolderOpen, Award, Briefcase, Mail, TrendingUp } from "lucide-react";

export default function DashboardOverview({
  summary,
}: {
  summary: { skills: number; projects: number; experiences: number };
}) {
  const stats = [
    {
      label: "Total Projects",
      value: summary.projects || 0,
      icon: FolderOpen,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Skills",
      value: summary.skills || 0,
      icon: Award,
      color: "text-green-600 bg-green-100",
    },
    {
      label: "Work Experience",
      value: summary.experiences || 0,
      icon: Briefcase,
      color: "text-purple-600 bg-purple-100",
    },
    {
      label: "Contact Messages",
      value: summary.projects || 0,
      icon: Mail,
      color: "text-orange-600 bg-orange-100",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600"></p>
      </div>
      {/* Stats Grid */}
      Welcome back! Here&apos;s what&apos;s happening with your portfolio.
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <IconComponent size={24} />
                </div>
                <TrendingUp size={16} className="text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FolderOpen size={24} className="text-blue-600" />
              <span className="text-sm font-medium">Add Project</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Award size={24} className="text-green-600" />
              <span className="text-sm font-medium">Add Skill</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Briefcase size={24} className="text-purple-600" />
              <span className="text-sm font-medium">Add Experience</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Mail size={24} className="text-orange-600" />
              <span className="text-sm font-medium">View Messages</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
