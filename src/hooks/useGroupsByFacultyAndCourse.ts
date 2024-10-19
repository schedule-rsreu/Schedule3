import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "../services/schedule.service";
import { hoursToMilliseconds } from "../utils/hours-to-milliseconds";

export const useGroupsByFacultyAndCourse = (
  faculty: string,
  course: number,
  initDataRaw: string
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["groups", faculty, course],
    queryFn: () =>
      scheduleService.getGroupsByCourseAndFaculty(faculty, course, initDataRaw),
    select: (data) => data.groups,
    enabled: !!faculty && !!course,
    refetchOnWindowFocus: false,
    staleTime: hoursToMilliseconds(24),
  });

  return {
    groups: data,
    isLoading,
    error,
  };
};
