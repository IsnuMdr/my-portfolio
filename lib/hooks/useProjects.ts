import { Project, ProjectData } from "@/types/project";
import { useState, useEffect } from "react";

export const useProjects = (refetchOnMount = true) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (refetchOnMount) {
      fetchProjects();
    }
  }, [refetchOnMount]);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { projects, loading, error, refetch };
};

export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProject = async (data: ProjectData) => {
    try {
      setLoading(true);
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create project");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createProject };
};

export const useUpdateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProject = async (id: string, data: ProjectData) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      });
      if (!response.ok) throw new Error("Failed to update project");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateProject };
};

export const useDeleteProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProject = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete project");
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteProject };
};
