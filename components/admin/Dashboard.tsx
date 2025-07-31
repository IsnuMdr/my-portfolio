"use client";
import { use, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderOpen,
  Award,
  Briefcase,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";
import DashboardOverview from "./DashboardOverview";
import ProjectsManager from "./ProjectsManager";
import SkillsManager from "./SkillsManager";
import ExperienceManager from "./ExperienceManager";
import ContactManager from "./ContactManager";

type TabType =
  | "overview"
  | "projects"
  | "skills"
  | "experience"
  | "contacts"
  | "settings";

export default function Dashboard({
  summary,
}: {
  summary: Promise<{ skills: number; projects: number; experiences: number }>;
}) {
  const allSummary = use(summary);

  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "skills", label: "Skills", icon: Award },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "contacts", label: "Contacts", icon: Mail },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview summary={allSummary} />;
      case "projects":
        return <ProjectsManager />;
      case "skills":
        return <SkillsManager />;
      case "experience":
        return <ExperienceManager />;
      case "contacts":
        return <ContactManager />;
      case "settings":
        return <div className="p-8">Settings page coming soon...</div>;
      default:
        return <DashboardOverview summary={allSummary} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-gray-600 text-sm">Portfolio Management</p>
        </div>

        <nav className="mt-6">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-primary-50 text-primary-600 border-r-2 border-primary-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <IconComponent size={20} />
                {tab.label}
              </button>
            );
          })}

          <div className="mt-8 px-6">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full overflow-y-auto"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}
