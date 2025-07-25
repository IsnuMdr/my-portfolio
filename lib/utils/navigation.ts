export const scrollToSection = (sectionId: string) => {
  // Remove # if present
  const targetId = sectionId.replace("#", "");

  // Special handling for home section
  if (targetId === "home") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }

  // For other sections
  const element = document.getElementById(targetId);
  if (element) {
    const headerHeight = 80; // Fixed header height
    const offsetTop = element.offsetTop - headerHeight;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
};

export const getCurrentSection = () => {
  const sections = ["home", "about", "projects", "skills", "contact"];
  const scrollPosition = window.scrollY;

  let currentSection = "home";

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      const offset = 150; // Offset for better UX

      // Check if we're within this section
      if (
        scrollPosition >= elementTop - offset &&
        scrollPosition < elementTop + elementHeight - offset
      ) {
        currentSection = sectionId;
      }
    }
  }

  return currentSection;
};
