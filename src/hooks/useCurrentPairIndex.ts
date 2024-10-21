import { parse, isBefore, isAfter, isEqual, subMinutes } from "date-fns";
import { IPair } from "../types/schedule";
import { useStore } from "../store/store";
import { dayIndices } from "../constants";

export const useCurrentPairIndex = (schedule: IPair[], currentTime: string) => {
  const selectedDay = useStore((state) => state.selectedDay);
  const selectedDayEn = useStore((state) => state.selectedDayEn);
  const selectedWeek = useStore((state) => state.selectedWeek);

  const currentDay = useStore((state) => state.currentDay);
  const currentWeek = useStore((state) => state.currentWeek);

  if (selectedWeek !== currentWeek) {
    return -1;
  }

  if (selectedDay !== currentDay) {
    return -1;
  }

  const today = new Date().getDay();

  if (selectedDayEn && today !== dayIndices[selectedDayEn]) {
    return -1;
  }

  for (let index = 0; index < schedule.length; index++) {
    const startTime = parse(
      schedule[index].time.split("-")[0],
      "HH.mm",
      new Date()
    );
    const endTime = parse(
      schedule[index].time.split("-")[1],
      "HH.mm",
      new Date()
    );

    const currentDateTime = parse(currentTime, "HH:mm", new Date());

    const startTimeWithOffset = subMinutes(startTime, 10);

    if (
      (isEqual(currentDateTime, startTimeWithOffset) ||
        isAfter(currentDateTime, startTimeWithOffset)) &&
      isBefore(currentDateTime, endTime)
    ) {
      return index;
    }
  }

  return -1;
};
