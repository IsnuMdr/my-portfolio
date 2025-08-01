"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface DeleteSkillButtonProps {
  skillId: string;
}

export function DeleteSkillButton({ skillId }: DeleteSkillButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/skills/`, {
        method: "DELETE",
        body: JSON.stringify({ id: skillId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete skill");
      }

      router.refresh();
      setShowConfirm(false);
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Failed to delete skill. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Confirm"}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="text-gray-600 hover:text-gray-800 text-sm"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="text-red-600 hover:text-red-900 text-sm"
    >
      <Trash2 size={16} />
    </button>
  );
}
