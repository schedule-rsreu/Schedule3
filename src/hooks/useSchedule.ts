import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "../services/schedule.service";

export const useSchedule = (group: string, initDataRaw: string) => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["schedule", group],
    queryFn: ({ signal }) =>
      scheduleService.getSchedule(group, initDataRaw, signal),
    select: (data) => data?.schedule,
    enabled: !!group,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    error,
    isSuccess,
  };
};
