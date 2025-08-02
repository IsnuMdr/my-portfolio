export const dateFormat = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const timeFormat = (date: Date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
