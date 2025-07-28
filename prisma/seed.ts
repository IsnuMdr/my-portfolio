import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed projects
  await prisma.project.createMany({
    data: [
      {
        slug: "ecommerce-platform",
        title: "E-Commerce Platform",
        description:
          "A modern, full-stack e-commerce solution with seamless user experience",
        longDescription:
          "Complete e-commerce platform built with Next.js, featuring user authentication, payment processing, inventory management, and admin dashboard. The platform supports multiple payment methods, real-time inventory tracking, and provides a smooth shopping experience across all devices.",
        challenge:
          "The client needed a scalable e-commerce solution that could handle high traffic loads while maintaining fast performance. The main challenges were implementing real-time inventory management, secure payment processing, and creating an intuitive admin interface.",
        solution:
          "Built a modern e-commerce platform using Next.js for optimal performance and SEO. Implemented Stripe for secure payments, used PostgreSQL with Prisma for reliable data management, and created a comprehensive admin dashboard for inventory and order management.",
        results: [
          "40% increase in conversion rate",
          "60% faster page load times",
          "99.9% uptime achieved",
          "Reduced cart abandonment by 35%",
          "Mobile sales increased by 80%",
        ],
        imageUrl: "/api/placeholder/1200/800",
        demoUrl: "https://ecommerce-demo.example.com",
        githubUrl: "https://github.com/IsnuMdr/ecommerce-platform",
        technologies: [
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Prisma",
          "PostgreSQL",
          "Stripe",
          "Redis",
        ],
        features: [
          "User Authentication & Profiles",
          "Product Catalog with Search & Filters",
          "Shopping Cart & Wishlist",
          "Secure Payment Processing",
          "Order Tracking & History",
          "Admin Dashboard",
          "Inventory Management",
          "Email Notifications",
          "Mobile Responsive Design",
          "SEO Optimized",
        ],
        category: "fullstack",
        featured: true,
        completedAt: "2023-07-25T00:00:00.000Z",
        duration: "3 months",
        role: "Full-Stack Developer",
        teamSize: 1,
      },
      {
        slug: "ai-chat-interface",
        title: "AI Chat Interface",
        description:
          "Intelligent chatbot with natural language processing capabilities",
        longDescription:
          "Modern chat interface powered by AI, featuring real-time messaging, conversation history, smart response suggestions, and context-aware interactions. Built with React and integrated with OpenAI API for natural language processing.",
        challenge:
          "Creating an intuitive chat interface that could handle complex conversations while maintaining context and providing relevant responses. The challenge was balancing AI capabilities with user experience and ensuring fast response times.",
        solution:
          "Developed a React-based chat interface with real-time WebSocket connections for instant messaging. Integrated OpenAI API for intelligent responses and implemented conversation memory to maintain context across sessions.",
        results: [
          "95% user satisfaction rate",
          "Average response time under 2 seconds",
          "70% reduction in support tickets",
          "24/7 customer support availability",
          "Handled 10,000+ conversations monthly",
        ],
        imageUrl: "/api/placeholder/1200/800",
        demoUrl: "https://ai-chat-demo.example.com",
        githubUrl: "https://github.com/IsnuMdr/ai-chat-interface",
        technologies: [
          "React",
          "Node.js",
          "OpenAI API",
          "Socket.io",
          "MongoDB",
          "Express.js",
        ],
        features: [
          "Real-time Messaging",
          "AI-Powered Responses",
          "Conversation History",
          "Context Awareness",
          "Multi-language Support",
          "File Sharing",
          "Voice Messages",
          "Typing Indicators",
          "Message Reactions",
          "Dark/Light Themes",
        ],
        category: "frontend",
        featured: true,
        completedAt: "2023-07-25T00:00:00.000Z",
        duration: "2 months",
        role: "Frontend Developer",
        teamSize: 2,
      },
      {
        slug: "task-management-system",
        title: "Task Management System",
        description:
          "Collaborative project management tool with real-time updates",
        longDescription:
          "Comprehensive task management system designed for team collaboration. Features include project boards, task assignments, real-time updates, file sharing, time tracking, and progress analytics.",
        challenge:
          "Building a collaborative platform that could handle multiple teams and projects simultaneously while maintaining real-time synchronization across all users. The system needed to be intuitive yet powerful enough for complex project management.",
        solution:
          "Created a Vue.js application with real-time capabilities using Socket.io. Implemented a flexible project structure with drag-and-drop interfaces, integrated file storage, and built comprehensive analytics dashboards.",
        results: [
          "50% improvement in team productivity",
          "Reduced project completion time by 30%",
          "98% user adoption rate",
          "Zero data loss incidents",
          "Supports teams up to 100 members",
        ],
        imageUrl: "/api/placeholder/1200/800",
        demoUrl: "https://taskmanager-demo.example.com",
        githubUrl: "https://github.com/IsnuMdr/task-management",
        technologies: [
          "Vue.js",
          "Express.js",
          "MongoDB",
          "Socket.io",
          "Vuex",
          "Chart.js",
        ],
        features: [
          "Project Boards & Lists",
          "Drag & Drop Interface",
          "Task Assignments & Due Dates",
          "Real-time Collaboration",
          "File Attachments",
          "Time Tracking",
          "Progress Analytics",
          "Team Management",
          "Notifications",
          "Export Reports",
        ],
        category: "fullstack",
        featured: false,
        completedAt: "2023-07-25T00:00:00.000Z",
        duration: "4 months",
        role: "Full-Stack Developer",
        teamSize: 3,
      },
      {
        slug: "weather-analytics-dashboard",
        title: "Weather Analytics Dashboard",
        description:
          "Data visualization dashboard for weather patterns and forecasts",
        longDescription:
          "Interactive dashboard for weather data visualization featuring real-time weather updates, historical data analysis, forecast predictions, and customizable charts. Built for meteorologists and weather enthusiasts.",
        challenge:
          "Processing and visualizing large amounts of weather data in real-time while maintaining smooth user interactions. The challenge was creating meaningful visualizations that could handle different data types and time ranges.",
        solution:
          "Built a React dashboard with D3.js for advanced data visualizations. Integrated multiple weather APIs for comprehensive data coverage and implemented efficient data caching for optimal performance.",
        results: [
          "Processes 1M+ data points daily",
          "Sub-second chart rendering",
          "99.5% forecast accuracy display",
          "Used by 5,000+ weather enthusiasts",
          "Featured in 3 weather publications",
        ],
        imageUrl: "/api/placeholder/1200/800",
        demoUrl: "https://weather-dashboard-demo.example.com",
        githubUrl: "https://github.com/IsnuMdr/weather-dashboard",
        technologies: [
          "React",
          "D3.js",
          "Weather API",
          "Chart.js",
          "Redux",
          "Node.js",
        ],
        features: [
          "Real-time Weather Data",
          "Interactive Charts",
          "Historical Analysis",
          "Forecast Predictions",
          "Location-based Data",
          "Customizable Views",
          "Data Export",
          "Mobile Responsive",
          "Weather Alerts",
          "API Integration",
        ],
        category: "frontend",
        featured: false,
        completedAt: "2023-07-25T00:00:00.000Z",
        duration: "2 months",
        role: "Frontend Developer",
        teamSize: 1,
      },
      {
        slug: "rest-api-server",
        title: "REST API Server",
        description: "Scalable REST API with authentication and rate limiting",
        longDescription:
          "High-performance REST API server built with Node.js and Express. Features comprehensive authentication, rate limiting, data validation, automated testing, and extensive documentation.",
        challenge:
          "Creating a robust API that could handle high traffic loads while maintaining security and performance. The API needed to be well-documented and easy to integrate for third-party developers.",
        solution:
          "Developed a modular Node.js API with JWT authentication, implemented Redis for caching and rate limiting, and created comprehensive Swagger documentation. Added automated testing and CI/CD pipeline.",
        results: [
          "Handles 10,000+ requests per minute",
          "99.9% uptime maintained",
          "Zero security incidents",
          "API response time under 100ms",
          "Integrated by 50+ developers",
        ],
        imageUrl: "/api/placeholder/1200/800",
        demoUrl: "https://api-demo.example.com",
        githubUrl: "https://github.com/IsnuMdr/rest-api-server",
        technologies: [
          "Node.js",
          "Express.js",
          "PostgreSQL",
          "JWT",
          "Redis",
          "Swagger",
          "Jest",
        ],
        features: [
          "RESTful API Design",
          "JWT Authentication",
          "Rate Limiting",
          "Data Validation",
          "Swagger Documentation",
          "Automated Testing",
          "Error Handling",
          "Logging & Monitoring",
          "CORS Support",
          "API Versioning",
        ],
        category: "backend",
        featured: false,
        completedAt: "2023-07-25T00:00:00.000Z",
        duration: "2 months",
        role: "Backend Developer",
        teamSize: 1,
      },
      {
        slug: "mobile-banking-app",
        title: "Mobile Banking App",
        description:
          "Secure mobile banking application with biometric authentication",
        longDescription:
          "React Native mobile banking application featuring biometric authentication, real-time transactions, account management, bill payments, and push notifications. Built with security and user experience as top priorities.",
        challenge:
          "Developing a secure mobile banking app that meets financial industry standards while providing an intuitive user experience. Security, performance, and offline capabilities were critical requirements.",
        solution:
          "Built a React Native app with biometric authentication, implemented secure data storage, integrated banking APIs, and added offline functionality for critical features. Used Redux for state management and Firebase for notifications.",
        results: [
          "4.8/5 app store rating",
          "100,000+ downloads",
          "Zero security breaches",
          "40% increase in mobile transactions",
          "Featured by app stores",
        ],
        imageUrl: "/api/placeholder/1200/800",
        demoUrl: "https://banking-app-demo.example.com",
        githubUrl: "https://github.com/IsnuMdr/mobile-banking-app",
        technologies: [
          "React Native",
          "Firebase",
          "Redux",
          "Expo",
          "TypeScript",
          "Biometric Auth",
        ],
        features: [
          "Biometric Authentication",
          "Account Management",
          "Real-time Transactions",
          "Bill Payments",
          "Transfer Money",
          "Transaction History",
          "Push Notifications",
          "Offline Mode",
          "Security Features",
          "Customer Support Chat",
        ],
        category: "mobile",
        featured: true,
        completedAt: "2023-07-25T00:00:00.000Z",
        duration: "5 months",
        role: "Mobile Developer",
        teamSize: 4,
      },
    ],
  });

  const projects = await prisma.project.findMany();

  // Create multiple images for each project
  await Promise.all(
    projects.map((project) => {
      return prisma.$transaction([
        prisma.projectImage.createMany({
          data: [
            {
              projectId: project.id,
              imageUrl: "/api/placeholder/1200/800",
            },
            {
              projectId: project.id,
              imageUrl: "/api/placeholder/1200/800",
            },
          ],
        }),
        prisma.projectTestimonial.createMany({
          data: [
            {
              projectId: project.id,
              quote:
                "The mobile banking app transformed our customer experience. User engagement increased significantly and we received overwhelmingly positive feedback.",
              author: "Michael Chen",
              position: "Head of Digital Banking",
              company: "SecureBank",
            },
          ],
        }),
      ]);
    })
  );

  // Seed experiences
  await prisma.experience.createMany({
    data: [
      {
        company: "Tech Innovations Inc.",
        position: "Senior Software Engineer",
        description:
          "Leading development of scalable web applications and mentoring junior developers. Responsible for architectural decisions and implementing best practices across the development team.",
        achievements: [
          "Led development of microservices architecture that improved system performance by 40%",
          "Mentored 5 junior developers and conducted code reviews",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
          "Architected real-time notification system serving 100k+ users",
        ],
        startDate: "2023-07-25T00:00:00.000Z",
        current: true,
        location: "Remote",
        companyUrl: "https://techinnovations.com",
        companyLogo: "/api/placeholder/60/60",
        technologies: [
          "React",
          "Next.js",
          "Node.js",
          "PostgreSQL",
          "AWS",
          "Docker",
        ],
        type: "fullTime",
      },
      {
        company: "StartupXYZ",
        position: "Full Stack Developer",
        description:
          "Built and maintained web applications using modern JavaScript frameworks. Collaborated closely with design and product teams to deliver user-centric solutions.",
        achievements: [
          "Developed e-commerce platform that generated $2M+ in revenue",
          "Reduced page load times by 50% through optimization techniques",
          "Integrated payment systems and third-party APIs",
          "Built responsive designs supporting 10+ device types",
        ],
        startDate: "2021-07-25T00:00:00.000Z",
        endDate: "2023-07-25T00:00:00.000Z",
        current: false,
        location: "San Francisco, CA",
        companyUrl: "https://startupxyz.com",
        companyLogo: "/api/placeholder/60/60",
        technologies: ["React", "Express.js", "MongoDB", "Stripe", "Vercel"],
      },
      {
        company: "Digital Solutions Ltd.",
        position: "Frontend Developer",
        description:
          "Focused on creating intuitive user interfaces and improving user experience. Worked with cross-functional teams to translate designs into interactive web applications.",
        achievements: [
          "Improved user engagement by 35% through UX enhancements",
          "Built component library used across 5+ projects",
          "Optimized SEO resulting in 60% increase in organic traffic",
          "Collaborated with designers to implement pixel-perfect designs",
        ],
        startDate: "2020-07-25T00:00:00.000Z",
        endDate: "2021-07-25T00:00:00.000Z",
        current: false,
        location: "New York, NY",
        companyUrl: "https://digitalsolutions.com",
        companyLogo: "/api/placeholder/60/60",
        technologies: ["Vue.js", "Sass", "Webpack", "Figma", "Git"],
      },
      {
        company: "Freelance Projects",
        position: "Web Developer",
        description:
          "Delivered custom web solutions for various clients including small businesses and startups. Managed full project lifecycle from requirements gathering to deployment.",
        achievements: [
          "Completed 15+ projects with 100% client satisfaction",
          "Developed custom CMS for content management",
          "Created responsive websites with modern design principles",
          "Provided ongoing maintenance and support",
        ],
        startDate: "2018-07-25T00:00:00.000Z",
        endDate: "2020-07-25T00:00:00.000Z",
        current: false,
        location: "Remote",
        technologies: ["WordPress", "PHP", "JavaScript", "MySQL", "HTML/CSS"],
        type: "contract",
      },
    ],
  });

  // Seed skills
  await prisma.skill.createMany({
    data: [
      // Frontend Skills
      {
        name: "JavaScript",
        category: "Frontend",
        level: 95,
        experience: "3+ years",
        description:
          "Expert in modern ES6+ features, async programming, and frameworks",
      },
      {
        name: "TypeScript",
        category: "Frontend",
        level: 90,
        experience: "2+ years",
        description:
          "Strong typing, interfaces, generics, and advanced type manipulation",
      },
      {
        name: "React",
        category: "Frontend",
        level: 92,
        experience: "3+ years",
        description:
          "Hooks, Context API, performance optimization, and testing",
      },
      {
        name: "Next.js",
        category: "Frontend",
        level: 88,
        experience: "2+ years",
        description: "SSR, SSG, API routes, and deployment optimization",
      },
      {
        name: "Tailwind CSS",
        category: "Frontend",
        level: 90,
        experience: "2+ years",
        description:
          "Utility-first CSS, responsive design, and custom configurations",
      },
      {
        name: "Vue.js",
        category: "Frontend",
        level: 75,
        experience: "1+ years",
        description: "Component-based architecture and Vuex state management",
      },
      // Backend Skills
      {
        name: "Node.js",
        category: "Backend",
        level: 85,
        experience: "2+ years",
        description:
          "Express.js, API development, middleware, and performance tuning",
      },
      {
        name: "Python",
        category: "Backend",
        level: 80,
        experience: "2+ years",
        description: "Django, Flask, data processing, and automation scripts",
      },
      {
        name: "PHP",
        category: "Backend",
        level: 70,
        experience: "1+ years",
        description: "Laravel framework and RESTful API development",
      },
      // Database Skills
      {
        name: "PostgreSQL",
        category: "Database",
        level: 80,
        experience: "2+ years",
        description: "Database design, optimization, queries, and migrations",
      },
      {
        name: "Prisma",
        category: "Database",
        level: 85,
        experience: "1+ years",
        description:
          "ORM, schema design, migrations, and type-safe database access",
      },
      {
        name: "MongoDB",
        category: "Database",
        level: 75,
        experience: "1+ years",
        description:
          "NoSQL database design, aggregation pipelines, and indexing",
      },
      {
        name: "Redis",
        category: "Database",
        level: 65,
        experience: "1+ years",
        description: "Caching strategies and session management",
      },
      // DevOps Skills
      {
        name: "Docker",
        category: "DevOps",
        level: 70,
        experience: "1+ years",
        description:
          "Containerization, Docker Compose, and deployment strategies",
      },
      {
        name: "AWS",
        category: "DevOps",
        level: 65,
        experience: "1+ years",
        description: "EC2, S3, Lambda, RDS, and serverless architectures",
      },
      {
        name: "Vercel",
        category: "DevOps",
        level: 80,
        experience: "2+ years",
        description: "Deployment, edge functions, and performance optimization",
      },
      // Tools Skills
      {
        name: "Git",
        category: "Tools",
        level: 90,
        experience: "3+ years",
        description:
          "Version control, branching strategies, and collaborative workflows",
      },
      {
        name: "Figma",
        category: "Tools",
        level: 75,
        experience: "2+ years",
        description: "UI/UX design, prototyping, and design system creation",
      },
      {
        name: "VS Code",
        category: "Tools",
        level: 95,
        experience: "3+ years",
        description: "Advanced usage, extensions, and workflow optimization",
      },
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
