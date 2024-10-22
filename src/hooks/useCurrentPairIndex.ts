import { parse, isBefore, isAfter, isEqual, subMinutes } from "date-fns";
import { IPair } from "../types/schedule";
import { useStore } from "../store/store";
import { dayIndices } from "../constants";
import { parseTime } from "../utils/parse-time";

export const useCurrentPairIndex = (
  schedule: IPair[],
  currentTime: string,
  selectedDayEn: string | null,
  currentDay: string | null,
  currentWeek: string | null
) => {
  const selectedDay = useStore((state) => state.selectedDay);
  const selectedWeek = useStore((state) => state.selectedWeek);

  if (schedule.length === 0) return -1;

  const today = new Date().getDay();

  if (
    selectedWeek !== currentWeek ||
    selectedDay !== currentDay ||
    (selectedDayEn && today !== dayIndices[selectedDayEn])
  ) {
    return -1;
  }

  try {
    const currentDateTime = parse(currentTime, "HH:mm", new Date());
    for (let index = 0; index < schedule.length; index++) {
      const { start, end } = parseTime(schedule[index].time);
      const startTimeWithOffset = subMinutes(start, 10);

      if (
        (isEqual(currentDateTime, startTimeWithOffset) ||
          isAfter(currentDateTime, startTimeWithOffset)) &&
        isBefore(currentDateTime, end)
      ) {
        return index;
      }
    }
  } catch (error) {
    console.log("Error processing schedule times:", error);
    return -1;
  }

  return -1;
};
