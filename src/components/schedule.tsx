import React from "react";
import { format } from "date-fns";
import { useStore } from "../store/store";
import { useSchedule } from "../hooks/useSchedule";
import { IDays, IPair, ISchedule } from "../types/schedule";
import { Pair } from "./pair";
import { daysOfTheWeekEn, fractionsEn } from "../constants";
import { useCurrentPairIndex } from "../hooks/useCurrentPairIndex";

export const Schedule: React.FC = () => {
  const [schedule, setSchedule] = React.useState<IPair[]>([]);
  const [currentTime, setCurrentTime] = React.useState(
    format(new Date(), "HH:mm")
  );

  const prevScheduleRef = React.useRef<IPair[]>([]);

  const selectedGroup = useStore((state) => state.selectedGroup);
  const selectedDayEn = useStore((state) => state.selectedDayEn);
  const selectedWeekEn = useStore((state) => state.selectedWeekEn);
  const selectedFaculty = useStore((state) => state.selectedFaculty);

  const currentDay = useStore((state) => state.currentDay);
  const currentWeek = useStore((state) => state.currentWeek);

  const initSchedule = useStore((state) => state.initSchedule);
  const groupAuth = useStore((state) => state.groupAuth);
  const initDataRaw = useStore((state) => state.initDataRaw);

  const { data, isLoading, error } = useSchedule(
    selectedGroup
      ? selectedGroup.value !== groupAuth
        ? selectedGroup.value
        : ""
      : "",
    initDataRaw
  );

  const currentPairIndex = useCurrentPairIndex(
    schedule,
    currentTime,
    selectedDayEn,
    currentDay,
    currentWeek
  );

  const newSchedule = React.useMemo(() => {
    if (data && selectedGroup && selectedGroup.value !== groupAuth) {
      return (
        data[selectedWeekEn as keyof ISchedule]?.[
          selectedDayEn as keyof IDays
        ] || []
      );
    } else if (
      initSchedule &&
      selectedGroup &&
      selectedGroup.value === groupAuth
    ) {
      return (
        initSchedule[selectedWeekEn as keyof ISchedule]?.[
          selectedDayEn as keyof IDays
        ] || []
      );
    }
    return [];
  }, [
    data,
    initSchedule,
    selectedGroup,
    selectedDayEn,
    selectedWeekEn,
    groupAuth,
  ]);

  React.useEffect(() => {
    if (
      JSON.stringify(newSchedule) !== JSON.stringify(prevScheduleRef.current) ||
      (newSchedule.length === 0 && prevScheduleRef.current.length === 0)
    ) {
      prevScheduleRef.current = newSchedule;
      setSchedule(newSchedule);
    }
  }, [newSchedule]);

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

  if (isLoading) {
    return <div className="loader" />;
  }
  
  if (error) {
    return (
      <div className="flex w-full justify-center py-[1.5rem] px-[1rem] rounded-[1rem] bg-primary mb-[.5rem]">
        <h2 className="font-normal text-[1.5rem]">Ошибка загрузки расписания</h2>
      </div>
    );
  }
  
  if (!selectedFaculty || !selectedGroup) {
    return (
      <div className="flex w-full justify-center py-[1.5rem] px-[1rem] rounded-[1rem] bg-primary mb-[.5rem]">
        <h2 className="font-normal text-[1.5rem]">Выберите факультет и группу</h2>
      </div>
    );
  }
  
  if (!isLoading && schedule.length === 0) {
    return (
      <div className="flex w-full justify-center py-[1.5rem] px-[1rem] rounded-[1rem] bg-primary mb-[.5rem]">
        <h2 className="font-normal text-[1.5rem]">В этот день нет занятий</h2>
      </div>
    );
  }
  

  return (
    <main className="flex flex-col justify-center items-center w-full max-w-3xl">
      {schedule.map((pair, index) => (
        <Pair
          key={index}
          pair={pair}
          index={index}
          currentPairIndex={currentPairIndex}
        />
      ))}
    </main>
  );
};
