import React from "react";
import cn from "classnames";
import { useStore } from "../store/store";
import { useCoursesByFaculty } from "../hooks/useCoursesByFaculty";

interface IProps {
  className?: string;
}

export const Course: React.FC<IProps> = ({ className }) => {
  const initDataRaw = useStore((state) => state.initDataRaw);
  const selectedFaculty = useStore((state) => state.selectedFaculty);
  const selectedCourse = useStore((state) => state.selectedCourse);
  const setSelectedCourse = useStore((state) => state.setSelectedCourse);
  const setIsLoadingCourses = useStore((state) => state.setIsLoadingCourses);

  const { courses, isLoading, error } = useCoursesByFaculty(
    (selectedFaculty && selectedFaculty.value.toLowerCase()) || "",
    initDataRaw
  );

  const handleCourseChange = () => {
    if (courses) {
      if (selectedCourse < courses.length) {
        setSelectedCourse(selectedCourse + 1);
      } else {
        setSelectedCourse(1);
      }
    }
  };

  React.useEffect(() => {
    setIsLoadingCourses(isLoading);
  }, [isLoading]);

  React.useEffect(() => {
    if (courses && !isLoading && selectedCourse > courses.length) {
      setSelectedCourse(1);
    }
  }, [courses, isLoading, selectedFaculty]);

  return (
    <button
      onClick={handleCourseChange}
      disabled={isLoading || !courses || !!error}
      className={cn(
        "course text-[2rem] cursor-pointer border-none bg-primary w-[5.5rem] h-[5rem] rounded-tl-[1rem]",
        {
          "!cursor-default": isLoading || !!error || !courses,
          button: courses && !isLoading && !error,
        },
        className
      )}
    >
      {selectedCourse}
    </button>
  );
};
