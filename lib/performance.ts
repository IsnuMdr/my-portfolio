export const preloadRoute = (href: string) => {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  link.as = "document";
  document.head.appendChild(link);
};

export const preloadImage = (src: string, priority: boolean = false) => {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  if (priority) {
    link.setAttribute("fetchpriority", "high");
  }
  document.head.appendChild(link);
};

export const preloadFont = (
  fontUrl: string,
  fontType: string = "font/woff2"
) => {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "font";
  link.type = fontType;
  link.href = fontUrl;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
};

// Enhanced loading for critical resources
export const preloadCriticalResources = () => {
  if (typeof window === "undefined") return;

  // Preload critical images with high priority
  const criticalImages = [
    "/images/profile.jpg",
    "/images/default-company-logo.png",
    "/images/default-project.jpg", // Project images
  ];

  criticalImages.forEach((src) => preloadImage(src, true));

  // Preload important routes
  const criticalRoutes = ["/", "/projects"];

  criticalRoutes.forEach((route) => preloadRoute(route));

  // Preload web fonts if using custom fonts
  // const fonts = ["/fonts/inter-var.woff2"];

  // fonts.forEach((font) => preloadFont(font));
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  if (typeof window === "undefined") return null;

  const defaultOptions = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window === "undefined") return fn();

  const start = performance.now();
  const result = fn();
  const end = performance.now();

  console.log(`Performance [${name}]: ${(end - start).toFixed(2)}ms`);
  return result;
};

// Resource hints for better loading
export const addResourceHints = () => {
  if (typeof window === "undefined") return;

  // DNS prefetch for external domains
  const externalDomains = [
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "api.placeholder.com",
    "github.com",
    "linkedin.com",
  ];

  externalDomains.forEach((domain) => {
    const link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });

  // Preconnect to critical external resources
  const preconnectDomains = ["fonts.googleapis.com", "fonts.gstatic.com"];

  preconnectDomains.forEach((domain) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = `https://${domain}`;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
