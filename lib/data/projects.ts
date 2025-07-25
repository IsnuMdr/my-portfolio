export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  imageUrl: string;
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  features: string[];
  category: string;
  featured: boolean;
  completedAt: string;
  duration: string;
  role: string;
  teamSize?: number;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
}

export const projectsData: ProjectDetail[] = [
  {
    id: "1",
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
    images: [
      "/api/placeholder/1200/800",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
    ],
    demoUrl: "https://ecommerce-demo.example.com",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
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
    completedAt: "2024-03",
    duration: "3 months",
    role: "Full-Stack Developer",
    teamSize: 1,
    testimonial: {
      quote:
        "The e-commerce platform exceeded our expectations. The performance improvements and user experience enhancements led to significant business growth.",
      author: "Sarah Johnson",
      position: "CEO",
      company: "Fashion Forward",
    },
  },
  {
    id: "2",
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
    images: [
      "/api/placeholder/1200/800",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
    ],
    demoUrl: "https://ai-chat-demo.example.com",
    githubUrl: "https://github.com/yourusername/ai-chat-interface",
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
    completedAt: "2024-02",
    duration: "2 months",
    role: "Frontend Developer",
    teamSize: 2,
  },
  {
    id: "3",
    slug: "task-management-system",
    title: "Task Management System",
    description: "Collaborative project management tool with real-time updates",
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
    images: [
      "/api/placeholder/1200/800",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
    ],
    demoUrl: "https://taskmanager-demo.example.com",
    githubUrl: "https://github.com/yourusername/task-management",
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
    completedAt: "2024-01",
    duration: "4 months",
    role: "Full-Stack Developer",
    teamSize: 3,
  },
  {
    id: "4",
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
    images: ["/api/placeholder/1200/800", "/api/placeholder/800/600"],
    demoUrl: "https://weather-dashboard-demo.example.com",
    githubUrl: "https://github.com/yourusername/weather-dashboard",
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
    completedAt: "2023-12",
    duration: "2 months",
    role: "Frontend Developer",
    teamSize: 1,
  },
  {
    id: "5",
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
    images: ["/api/placeholder/1200/800", "/api/placeholder/800/600"],
    demoUrl: "https://api-demo.example.com",
    githubUrl: "https://github.com/yourusername/rest-api-server",
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
    completedAt: "2023-11",
    duration: "2 months",
    role: "Backend Developer",
    teamSize: 1,
  },
  {
    id: "6",
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
    images: ["/api/placeholder/1200/800", "/api/placeholder/800/600"],
    demoUrl: "https://banking-app-demo.example.com",
    githubUrl: "https://github.com/yourusername/mobile-banking-app",
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
    completedAt: "2023-10",
    duration: "5 months",
    role: "Mobile Developer",
    teamSize: 4,
    testimonial: {
      quote:
        "The mobile banking app transformed our customer experience. User engagement increased significantly and we received overwhelmingly positive feedback.",
      author: "Michael Chen",
      position: "Head of Digital Banking",
      company: "SecureBank",
    },
  },
];

export function getAllProjects(): ProjectDetail[] {
  return projectsData;
}

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectsData.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): ProjectDetail[] {
  return projectsData.filter((project) => project.featured);
}

export function getProjectsByCategory(category: string): ProjectDetail[] {
  if (category === "all") return projectsData;
  if (category === "featured") return getFeaturedProjects();
  return projectsData.filter((project) => project.category === category);
}
