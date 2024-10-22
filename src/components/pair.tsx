import React from "react";
import cn from "classnames";
import { IPair } from "../types/schedule";

interface Props {
  pair: IPair;
  index: number;
  currentPairIndex: number;
}

export const Pair: React.FC<Props> = React.memo(
  ({ pair, index, currentPairIndex }) => {
    const [isCurrent, setIsCurrent] = React.useState(false);

    React.useEffect(() => {
      if (currentPairIndex === index) {
        setIsCurrent(true);
      } else {
        setIsCurrent(false);
      }
    }, [currentPairIndex, index]);

    return (
      <div
        className={cn(
          "mb-[.5rem] py-[1.5rem] px-[1rem] w-full bg-primary rounded-[1rem]",
          {
            "border-[.2rem] border-solid border-accent transition-all duration-500":
              isCurrent,
            "border-[.2rem] border-solid border-transparent transition-none":
              !isCurrent,
          }
        )}
        key={index}
      >
        <p
          className={cn(
            "flex items-center justify-center bg-secondary font-medium rounded-[.5rem] text-[1.5rem] w-[9rem] h-[2.3rem] mt-0 mb-[.5rem] mx-auto transition-all duration-500", // Плавный переход для фона
            {
              "!bg-accent": isCurrent,
              "text-white": isCurrent,
              "text-black": !isCurrent,
              "transition-none": true,
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
  }
);
