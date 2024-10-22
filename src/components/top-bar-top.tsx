import React from "react";
import { Course } from "./course";
import { DropDownFaculty } from "./drop-down-faculty";
import { DropDownGroup } from "./drop-down-group";
import { useStore } from "../store/store";
import { useCoursesByFaculty } from "../hooks/useCoursesByFaculty";
import { useGroupsByFacultyAndCourse } from "../hooks/useGroupsByFacultyAndCourse";

export const TopBarTop: React.FC = () => {
  const initDataRaw = useStore((state) => state.initDataRaw);
  const selectedFaculty = useStore((state) => state.selectedFaculty);
  const selectedCourse = useStore((state) => state.selectedCourse);
  const setSelectedCourse = useStore((state) => state.setSelectedCourse);

  const { courses, isLoadingCourses, errorCourses } = useCoursesByFaculty(
    selectedFaculty?.value.toLowerCase() || "",
    initDataRaw
  );

  const { groups, isLoadingGroups, errorGroups } = useGroupsByFacultyAndCourse(
    selectedFaculty?.value || "",
    !isLoadingCourses && selectedCourse <= (courses?.length || 0)
      ? selectedCourse
      : NaN,
    initDataRaw
  );

  React.useEffect(() => {
    if (courses && selectedCourse > courses.length) {
      setSelectedCourse(1);
    }
  }, [courses]);

  return (
    <>
      <Course
        courses={courses}
        isLoading={isLoadingCourses}
        error={errorCourses}
        selectedCourse={selectedCourse}
        className="col-span-1"
      />

      <DropDownFaculty className="col-span-3" />

      <DropDownGroup
        groups={groups}
        isLoading={isLoadingGroups}
        error={errorGroups}
        selectedCourse={selectedCourse}
        selectedFaculty={selectedFaculty}
        className="col-span-2"
      />
    </>
  );
};
