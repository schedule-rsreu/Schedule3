import React from "react";
import cn from "classnames";
import Select, { OnChangeValue } from "react-select";
import { useStore } from "../store/store";
import { useGroupsByFacultyAndCourse } from "../hooks/useGroupsByFacultyAndCourse";
import { IGroupOption } from "../types/options";

interface IProps {
  className?: string;
}

export const DropDownGroup: React.FC<IProps> = ({ className }) => {
  const initDataRaw = useStore((state) => state.initDataRaw);
  const selectedCourse = useStore((state) => state.selectedCourse);
  const selectedFaculty = useStore((state) => state.selectedFaculty);
  const selectedGroup = useStore((state) => state.selectedGroup);
  const setSelectedGroup = useStore((state) => state.setSelectedGroup);
  const isLoadingCourses = useStore((state) => state.isLoadingCourses);

  const { groups, isLoading, error } = useGroupsByFacultyAndCourse(
    selectedFaculty?.value || "",
    (!isLoadingCourses && selectedCourse) || NaN,
    initDataRaw
  );

  const options = groups
    ?.map((group) => ({
      value: group.toUpperCase(),
      label: group.toUpperCase(),
    }))
    .filter((group) => group.value !== selectedGroup?.value);

  const handleGroupChange = (newValue: OnChangeValue<IGroupOption, false>) => {
    setSelectedGroup(newValue as IGroupOption);
  };

  React.useEffect(() => {
    if (groups && selectedGroup && selectedCourse && selectedFaculty) {
      if (!groups.includes(selectedGroup?.value)) {
        setSelectedGroup(null);
      }
    }
  }, [selectedCourse, selectedFaculty, groups]);

  return (
    <Select
      options={options}
      classNamePrefix={"group-select"}
      isSearchable={false}
      placeholder={"ГРУППА"}
      onChange={handleGroupChange}
      value={selectedGroup}
      className={cn(className, "group")}
      isDisabled={isLoading || !!error || !selectedFaculty || !groups}
      noOptionsMessage={() => (
        <span style={{ color: "white", fontSize: "1.5rem" }}>
          Больше нет групп
        </span>
      )}
    />
  );
};
