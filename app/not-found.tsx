"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/ui/Header";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <Header />
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-gray-600 mb-6">
            The page you are looking for does not exist.
          </p>
          <button
            className="btn-primary-elegant flex items-center gap-2"
            onClick={handleGoBack}
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}
