import React from "react";
import { days, fraction } from "../constants";
import { ButtonFraction } from "./button-fraction";
import { Day } from "./day";

export const TopBarBottom: React.FC = () => {
  return (
    <>
      {fraction.map((fraction) => (
        <ButtonFraction
          key={fraction}
          fraction={fraction}
          className="col-span-3"
        />
      ))}

      {days.map((day) => (
        <Day key={day} day={day} className="col-span-1" />
      ))}
    </>
  );
};
