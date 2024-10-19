import React from "react";
import Select, { OnChangeValue } from "react-select";
import { useStore } from "../store/store";
import { IFacultyOption } from "../types/options";

interface IProps {
  className?: string;
}

export const DropDownFaculty: React.FC<IProps> = ({ className }) => {
  const faculties = useStore((state) => state.faculties);
  const selectedFaculty = useStore((state) => state.selectedFaculty);
  const setSelectedFaculty = useStore((state) => state.setSelectedFaculty);

  const options = faculties
    ?.map((faculty) => ({
      value: faculty.toUpperCase(),
      label: faculty.toUpperCase(),
    }))
    .filter((faculty) => faculty.value !== selectedFaculty?.value);

  const handleFacultyChange = (
    newValue: OnChangeValue<IFacultyOption, false>
  ) => {
    setSelectedFaculty(newValue as IFacultyOption);
  };

  return (
    <Select
      options={options}
      classNamePrefix={"department-select"}
      isSearchable={false}
      placeholder={"ФАКУЛЬТЕТ"}
      onChange={handleFacultyChange}
      value={selectedFaculty}
      className={className}
      isDisabled={!faculties || !options}
    />
  );
};
