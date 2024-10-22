import React from "react";
import cn from "classnames";
import Select, { OnChangeValue } from "react-select";
import { useStore } from "../store/store";
import { IFacultyOption, IGroupOption } from "../types/options";

interface IProps {
  groups: string[] | undefined;
  isLoading: boolean;
  error: Error | null;
  selectedCourse: number;
  selectedFaculty: IFacultyOption | null;
  className?: string;
}

export const DropDownGroup: React.FC<IProps> = React.memo(
  ({
    groups,
    isLoading,
    error,
    selectedCourse,
    selectedFaculty,
    className,
  }) => {
    const selectedGroup = useStore((state) => state.selectedGroup);
    const setSelectedGroup = useStore((state) => state.setSelectedGroup);

    const options = groups
      ?.map((group) => ({
        value: group.toUpperCase(),
        label: group.toUpperCase(),
      }))
      .filter((group) => group.value !== selectedGroup?.value);

    // str.trim().split(" ").filter((group) => group !== "").join(" ")

    const handleGroupChange = (
      newValue: OnChangeValue<IGroupOption, false>
    ) => {
      setSelectedGroup(newValue as IGroupOption);
    };

    React.useEffect(() => {
      if (groups && selectedGroup && selectedCourse && selectedFaculty) {
        if (!groups.includes(selectedGroup?.value.toLowerCase())) {
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
  }
);
