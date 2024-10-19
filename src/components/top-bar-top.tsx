import React from "react";
import { Course } from "./course";
import { DropDownFaculty } from "./drop-down-faculty";
import { DropDownGroup } from "./drop-down-group";

export const TopBarTop: React.FC = () => {
  return (
    <>
      <Course className="col-span-1" />
      <DropDownFaculty className="col-span-3" />
      <DropDownGroup className="col-span-2" />
    </>
  );
};
