export const preloadRoute = (href: string) => {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  document.head.appendChild(link);
};

export const preloadImage = (src: string) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  document.head.appendChild(link);
};

// Enhanced loading for critical resources
export const preloadCriticalResources = () => {
  // Preload critical images
  preloadImage("/images/profile.jpg");
  preloadImage("/images/hero-bg.jpg");

  // Preload critical routes
  preloadRoute("/projects");
  preloadRoute("/contact");
};
