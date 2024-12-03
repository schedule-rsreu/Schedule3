import { useStore } from "../store/store";
import { dayService } from "../services/day.service";

export const useFetchToday = () => {
  const setSelectedDay = useStore((state) => state.setSelectedDay);
  const setSelectedDayEn = useStore((state) => state.setSelectedDayEn);
  const setCurrentDay = useStore((state) => state.setCurrentDay);
  const setSelectedWeek = useStore((state) => state.setSelectedWeek);
  const setSelectedWeekEn = useStore((state) => state.setSelectedWeekEn);
  const setCurrentWeek = useStore((state) => state.setCurrentWeek);
  const setIsLoadingToday = useStore((state) => state.setIsLoadingToday);

  const fetchToday = async () => {
    try {
      const today = await dayService.getToday();

      setSelectedDay(today.day_ru);
      setSelectedDayEn(today.day.toLowerCase());
      setCurrentDay(today.day_ru);
      setSelectedWeek(today.week_type.toUpperCase());
      setSelectedWeekEn(today.week_type_eng.toLowerCase());
      setCurrentWeek(today.week_type.toUpperCase());
    } catch (error) {
      setSelectedDay("Пн");
      setSelectedDayEn("monday");
      setCurrentDay("Пн");
      setSelectedWeek("ЧИСЛИТЕЛЬ");
      setSelectedWeekEn("numerator");
      setCurrentWeek("ЧИСЛИТЕЛЬ");
      console.error(error);
    } finally {
      setIsLoadingToday(false);
    }
  };

  return { fetchToday };
};
