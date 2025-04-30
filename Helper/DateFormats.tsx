export const changeDateFormat = (d: string) => {
  const originalDateStr = d;
  const parsedDate = new Date(originalDateStr);
  const options: any = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = parsedDate.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const changeDateFormatWithDay = (d: string) => {
  const parsedDate = new Date(d);

  if (isNaN(parsedDate.getTime())) return "Invalid Date"; // Handle invalid date

  // Get parts of the date
  const weekday = parsedDate.toLocaleDateString("en-US", { weekday: "long" });
  const day = parsedDate.getDate();
  const month = parsedDate.toLocaleDateString("en-US", { month: "long" });
  const year = parsedDate.getFullYear();

  // Function to add ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (day: number) => {
    if (day >= 11 && day <= 13) return "th"; // Special case for 11-13
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${weekday}, ${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

export const changeDateFormatWithTime = (d: string) => {
  const originalDateStr = d;
  const parsedDate = new Date(originalDateStr);
  if (isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = parsedDate.toLocaleDateString("en-US", dateOptions);
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedTime = parsedDate.toLocaleTimeString("en-US", timeOptions);
  return `${formattedDate} ${formattedTime}`;
};

export const formatWithoutTimeZoneOffset = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatISOStringDate = (d: Date) => {
  const date = new Date(d);
  const pad = (num: number) => String(num).padStart(2, "0");
  const padMilliseconds = (num: number) => String(num).padStart(3, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const milliseconds = padMilliseconds(date.getMilliseconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};
