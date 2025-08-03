import { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Panel - Portfolio",
  description: "Admin panel for managing portfolio content",
};

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
    >
      {label}
    </Link>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigations = [
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/skills", label: "Skills" },
    { href: "/admin/experiences", label: "Experiences" },
    { href: "/admin/about", label: "About" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container-elegant">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/admin"
                className="flex items-center px-4 text-lg font-semibold text-gray-900"
              >
                Admin Panel
              </Link>
              <div className="hidden sm:flex sm:ml-6 sm:space-x-8">
                {navigations.map((nav) => (
                  <AdminNavLink
                    key={nav.href}
                    href={nav.href}
                    label={nav.label}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/" className="btn-primary-elegant">
                View Site
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="container-elegant py-6">{children}</main>
    </div>
  );
}
