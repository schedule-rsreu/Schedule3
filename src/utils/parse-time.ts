import { parse } from "date-fns";

export const parseTime = (timeString: string) => {
  const timeParts = timeString.split("-");
  if (timeParts.length !== 2) {
    throw new Error(`Invalid time format: ${timeString}`);
  }
  return {
    start: parse(timeParts[0], "HH.mm", new Date()),
    end: parse(timeParts[1], "HH.mm", new Date()),
  };
};
