import { useStore } from "../store/store";
import { scheduleService } from "../services/schedule.service";

export const useFetchFaculties = () => {
  const setFaculties = useStore((state) => state.setFaculties);
  const setIsLoadingFaculties = useStore(
    (state) => state.setIsLoadingFaculties
  );

  const fetchFaculties = async () => {
    try {
      const data = await scheduleService.getFaculties();
      setFaculties(data.faculties);
    } catch (error) {
      setFaculties(["иэф", "фаиту", "фвт", "фрт", "фэ"]);
      console.error(error);
    } finally {
      setIsLoadingFaculties(false);
    }
  };

  return { fetchFaculties };
};
