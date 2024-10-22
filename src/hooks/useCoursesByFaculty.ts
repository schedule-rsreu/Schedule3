import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "../services/schedule.service";
import { hoursToMilliseconds } from "../utils/hours-to-milliseconds";

export const useCoursesByFaculty = (faculty: string, initDataRaw: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["courses", faculty],
    queryFn: ({ signal }) =>
      scheduleService.getCoursesByFaculty(faculty, initDataRaw, signal),
    select: (data) => data?.courses,
    enabled: !!faculty,
    refetchOnWindowFocus: false,
    staleTime: hoursToMilliseconds(12),
  });

  return {
    courses: data,
    isLoadingCourses: isLoading,
    errorCourses: error,
  };
};
