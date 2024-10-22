import React from "react";
import cn from "classnames";
import { useStore } from "../store/store";

interface IProps {
  courses: number[] | undefined;
  isLoading: boolean;
  error: Error | null;
  selectedCourse: number;
  className?: string;
}

export const Course: React.FC<IProps> = React.memo(
  ({ courses, isLoading, error, selectedCourse, className }) => {
    const setSelectedCourse = useStore((state) => state.setSelectedCourse);

    const handleCourseChange = () => {
      if (courses) {
        const nextCourse =
          selectedCourse < courses.length ? selectedCourse + 1 : 1;
        setSelectedCourse(nextCourse);
      }
    };

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
  }
);
