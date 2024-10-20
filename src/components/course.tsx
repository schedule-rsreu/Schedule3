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

  const { courses, isLoading, error } = useCoursesByFaculty(
    selectedFaculty?.value.toLowerCase() || "",
    initDataRaw
  );

  if (error) {
    console.error(error.message);
  }

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
    if (courses && !courses.includes(selectedCourse)) {
      setSelectedCourse(1);
    }
  }, [courses]);

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
