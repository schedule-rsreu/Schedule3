import React from "react";
import { TopBarTop } from "./top-bar-top";
import { TopBarBottom } from "./top-bar-bottom";

export const TopBar: React.FC = () => {
  return (
    <header className="grid grid-cols-6 grid-rows-3 gap-[.5rem] mb-[.5rem]">
      <TopBarTop />
      <TopBarBottom />
    </header>
  );
};
