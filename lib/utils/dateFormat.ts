export const dateFormat = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return new Date(date).toLocaleDateString("en-US", {
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

export const calculateDuration = (
  startDate: Date | string,
  endDate?: Date | string
) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
  } else if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  } else {
    return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${
      remainingMonths !== 1 ? "s" : ""
    }`;
  }
};

export function calculateYearsFromDate(date: Date | string): string {
  const inputDate = new Date(date);
  const now = new Date();

  let years = now.getFullYear() - inputDate.getFullYear();

  // Check if the full year has passed
  const hasNotHadBirthdayThisYear =
    now.getMonth() < inputDate.getMonth() ||
    (now.getMonth() === inputDate.getMonth() &&
      now.getDate() < inputDate.getDate());

  if (hasNotHadBirthdayThisYear) {
    years -= 1;
  }

  return years + " years";
}
