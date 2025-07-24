import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed projects
  await prisma.project.createMany({
    data: [
      {
        title: "E-Commerce Platform",
        description:
          "Full-stack e-commerce solution with modern design and secure payments",
        imageUrl: "/images/project1.jpg",
        demoUrl: "https://demo.com",
        githubUrl: "https://github.com/yourusername/project1",
        technologies: [
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Stripe",
          "PostgreSQL",
        ],
        featured: true,
      },
      {
        title: "Task Management App",
        description: "Collaborative task management with real-time updates",
        imageUrl: "/images/project2.jpg",
        demoUrl: "https://demo.com",
        githubUrl: "https://github.com/yourusername/project2",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
        featured: true,
      },
      {
        title: "Weather Dashboard",
        description: "Beautiful weather app with location-based forecasts",
        imageUrl: "/images/project3.jpg",
        demoUrl: "https://demo.com",
        githubUrl: "https://github.com/yourusername/project3",
        technologies: ["Vue.js", "Weather API", "Chart.js"],
        featured: false,
      },
    ],
  });

  // Seed experiences
  await prisma.experience.createMany({
    data: [
      {
        company: "Tech Corp Inc.",
        position: "Senior Software Engineer",
        description:
          "Led development of microservices architecture, mentored junior developers, and implemented CI/CD pipelines.",
        startDate: new Date("2022-01-01"),
        current: true,
        location: "Remote",
      },
      {
        company: "StartupXYZ",
        position: "Full Stack Developer",
        description:
          "Built and maintained web applications using React and Node.js, collaborated with design team on UX improvements.",
        startDate: new Date("2021-01-01"),
        endDate: new Date("2021-12-31"),
        current: false,
        location: "San Francisco, CA",
      },
    ],
  });

  // Seed skills
  await prisma.skill.createMany({
    data: [
      { name: "JavaScript", category: "Frontend", level: 5 },
      { name: "TypeScript", category: "Frontend", level: 4 },
      { name: "React", category: "Frontend", level: 5 },
      { name: "Next.js", category: "Frontend", level: 4 },
      { name: "Node.js", category: "Backend", level: 4 },
      { name: "PostgreSQL", category: "Database", level: 4 },
      { name: "Docker", category: "DevOps", level: 3 },
      { name: "AWS", category: "Cloud", level: 3 },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
