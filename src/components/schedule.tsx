import React from "react";
import { format } from "date-fns";
import { useStore } from "../store/store";
import { useSchedule } from "../hooks/useSchedule";
import { IDays, IPair, ISchedule } from "../types/schedule";
import { Pair } from "./pair";
import { daysOfTheWeekEn, fractionsEn } from "../constants";

export const Schedule: React.FC = () => {
  const [schedule, setSchedule] = React.useState<IPair[]>([]);
  const [currentTime, setCurrentTime] = React.useState(
    format(new Date(), "HH:mm")
  );

  const initDataRaw = useStore((state) => state.initDataRaw);
  const initSchedule = useStore((state) => state.initSchedule);
  const groupAuth = useStore((state) => state.groupAuth);

  const selectedGroup = useStore((state) => state.selectedGroup);
  const selectedDayEn = useStore((state) => state.selectedDayEn);
  const selectedWeekEn = useStore((state) => state.selectedWeekEn);
  const selectedFaculty = useStore((state) => state.selectedFaculty);

  const currentDay = useStore((state) => state.currentDay);
  const currentWeek = useStore((state) => state.currentWeek);

  const { data, isLoading, error } = useSchedule(
    selectedGroup
      ? selectedGroup.value !== groupAuth
        ? selectedGroup.value
        : ""
      : "",
    initDataRaw
  );

  React.useEffect(() => {
    if (
      schedule.length > 0 &&
      selectedDayEn &&
      selectedWeekEn &&
      daysOfTheWeekEn[selectedDayEn] === currentDay &&
      fractionsEn[selectedWeekEn] === currentWeek
    ) {
      const interval = setInterval(
        () => setCurrentTime(format(new Date(), "HH:mm")),
        60000
      );
      return () => clearInterval(interval);
    }
  }, [schedule, currentDay, currentWeek]);

  React.useEffect(() => {
    if (selectedGroup && selectedDayEn && selectedWeekEn) {
      if (data && selectedGroup.value !== groupAuth) {
        if (
          data[selectedWeekEn as keyof ISchedule] &&
          data[selectedWeekEn as keyof ISchedule][selectedDayEn as keyof IDays]
        ) {
          setSchedule(
            data[selectedWeekEn as keyof ISchedule][
              selectedDayEn as keyof IDays
            ]
          );
        }
      } else if (initSchedule && selectedGroup.value === groupAuth) {
        if (
          initSchedule[selectedWeekEn as keyof ISchedule] &&
          initSchedule[selectedWeekEn as keyof ISchedule][
            selectedDayEn as keyof IDays
          ]
        ) {
          setSchedule(
            initSchedule[selectedWeekEn as keyof ISchedule][
              selectedDayEn as keyof IDays
            ]
          );
        }
      }
    }
  }, [
    data,
    initSchedule,
    selectedDayEn,
    selectedWeekEn,
    selectedGroup,
    groupAuth,
  ]);

  return (
    <main className="flex flex-col justify-center items-center w-full max-w-3xl">
      {isLoading && <div className="loader" />}

      {!isLoading && error && (
        <div className="flex w-full justify-center py-[1.5rem] px-[1rem] rounded-[1rem] bg-primary mb-[.5rem] no-schedule">
          <h2 className="font-normal text-[1.5rem]">
            Ошибка загрузки расписания
          </h2>
        </div>
      )}

      {(!selectedFaculty || !selectedGroup) && !isLoading && !error && (
        <div className="flex w-full justify-center py-[1.5rem] px-[1rem] rounded-[1rem] bg-primary mb-[.5rem]">
          <h2 className="font-normal text-[1.5rem]">
            Выберите факультет и группу
          </h2>
        </div>
      )}

      {selectedFaculty &&
      selectedGroup &&
      !isLoading &&
      !error &&
      schedule.length > 0
        ? schedule.map((pair, index) => (
            <Pair
              key={index}
              schedule={schedule}
              currentTime={currentTime}
              pair={pair}
              index={index}
            />
          ))
        : selectedFaculty &&
          selectedGroup &&
          !isLoading &&
          !error &&
          schedule.length === 0 && (
            <div className="flex w-full justify-center py-[1.5rem] px-[1rem] rounded-[1rem] bg-primary mb-[.5rem] no-schedule">
              <h2 className="font-normal text-[1.5rem]">
                В этот день нет занятий
              </h2>
            </div>
          )}
    </main>
  );
};
