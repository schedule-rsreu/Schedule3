import React from "react";
import cn from "classnames";
import { useStore } from "../store/store";
import { fractionsRu } from "../constants";

interface IProps {
  fraction: string;
  className?: string;
}

export const ButtonFraction: React.FC<IProps> = React.memo(
  ({ fraction, className }) => {
    const selectedWeek = useStore((state) => state.selectedWeek);
    const setSelectedWeek = useStore((state) => state.setSelectedWeek);
    const setSelectedWeekEn = useStore((state) => state.setSelectedWeekEn);

    const handleWeekChange = () => {
      setSelectedWeek(fraction);
      setSelectedWeekEn(fractionsRu[fraction]);
    };

    return (
      <button
        onClick={handleWeekChange}
        className={cn(
          "button bg-primary border-none text-[1.8rem] font-light text-textPrimary cursor-pointer transition duration-[30ms] ease-out",
          {
            "!bg-accent text-white": fraction === selectedWeek,
            "rounded-bl-[1rem]": fraction === "ЧИСЛИТЕЛЬ",
            "rounded-br-[1rem]": fraction === "ЗНАМЕНАТЕЛЬ",
          },
          className
        )}
      >
        {fraction}
      </button>
    );
  },
  (prevProps, nextProps) => prevProps.fraction === nextProps.fraction
);
