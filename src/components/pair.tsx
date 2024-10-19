import React from "react";
import cn from "classnames";
import { IPair } from "../types/schedule";
import { useCurrentPairIndex } from "../hooks/useCurrentPairIndex";

interface Props {
  schedule: IPair[];
  pair: IPair;
  currentTime: string;
  index: number;
}

export const Pair: React.FC<Props> = ({
  schedule,
  pair,
  currentTime,
  index,
}) => {
  const currentPairIndex = useCurrentPairIndex(schedule, currentTime);

  return (
    <div
      className={cn(
        "mb-[.5rem] py-[1.5rem] px-[1rem] w-full bg-primary rounded-[1rem]",
        {
          "border-[.2rem] border-solid border-accent":
            currentPairIndex === index,
        }
      )}
      key={index}
    >
      <p
        className={cn(
          "flex items-center justify-center bg-secondary font-medium rounded-[.5rem] text-[1.5rem] w-[9rem] h-[2.3rem] mt-0 mb-[.5rem] mx-auto",
          {
            "!bg-accent text-white": currentPairIndex === index,
          }
        )}
      >
        {pair.time}
      </p>
      <p className="whitespace-pre-line text-center font-light text-[2rem] last:mb-[1.4rem]">
        {pair.lesson}
      </p>
    </div>
  );
};
