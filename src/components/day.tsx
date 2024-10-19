import React from "react";
import cn from "classnames";
import { useStore } from "../store/store";
import { daysOfTheWeekRu } from "../constants";

interface IProps {
  day: string;
  className?: string;
}

export const Day: React.FC<IProps> = React.memo(
  ({ day, className }) => {
    const selectedDay = useStore((state) => state.selectedDay);
    const setSelectedDay = useStore((state) => state.setSelectedDay);
    const setSelectedDayEn = useStore((state) => state.setSelectedDayEn);

    const handleDayChange = () => {
      setSelectedDay(day);
      setSelectedDayEn(daysOfTheWeekRu[day]);
    };

    return (
      <button
        className={cn(
          "button bg-primary border-none text-[1.8rem] font-light text-textPrimary transition duration-[30ms] ease-out",
          {
            "rounded-l-[1rem]": day === "Пн",
            "rounded-br-[1rem]": day === "Ср",
            "rounded-bl-[1rem]": day === "Чт",
            "rounded-r-[1rem]": day === "Сб",
          },
          {
            "!bg-accent text-white": day === selectedDay,
          },
          className
        )}
        onClick={handleDayChange}
      >
        {day}
      </button>
    );
  },
  (prevProps, nextProps) => prevProps.day === nextProps.day
);
