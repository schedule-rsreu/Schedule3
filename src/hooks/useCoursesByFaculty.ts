import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "../services/schedule.service";
import { hoursToMilliseconds } from "../utils/hours-to-milliseconds";

export const useCoursesByFaculty = (faculty: string, initDataRaw: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["courses", faculty],
    queryFn: () => scheduleService.getCoursesByFaculty(faculty, initDataRaw),
    select: (data) => data.courses,
    enabled: !!faculty,
    refetchOnWindowFocus: false,
    staleTime: hoursToMilliseconds(24),
  });

  return {
    courses: data,
    isLoading,
    error,
  };
};
