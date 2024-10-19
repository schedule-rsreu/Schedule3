import { IFacultyOption, IGroupOption } from "./options";

export interface IStore {
  selectedCourse: number;
  selectedFaculty: IFacultyOption | null;
  faculties: string[] | null;
  selectedGroup: IGroupOption | null;
  selectedWeek: string | null;
  currentWeek: string | null;
  selectedDay: string | null;
  selectedDayEn: string | null;
  selectedWeekEn: string | null;
  currentDay: string | null;
  initDataRaw: string;
  groupAuth: string | null;
  initSchedule: ISchedule | null;
  isLoadingInit: boolean;
  isLoadingFaculties: boolean;
  isLoadingToday: boolean;
  setSelectedCourse: (course: number) => void;
  setSelectedFaculty: (faculty: IFacultyOption | null) => void;
  setFaculties: (faculties: string[]) => void;
  setSelectedGroup: (group: IGroupOption | null) => void;
  setSelectedWeek: (week: string) => void;
  setSelectedWeekEn: (weekEn: string) => void;
  setSelectedDay: (day: string) => void;
  setSelectedDayEn: (dayEn: string) => void;
  setCurrentDay: (day: string) => void;
  setGroupAuth: (groupAuth: string | null) => void;
  setInitDataRaw: (initDataRaw: string) => void;
  setInitSchedule: (initSchedule: ISchedule | null) => void;
  setIsLoadingInit: (loading: boolean) => void;
  setIsLoadingToday: (loading: boolean) => void;
  setIsLoadingFaculties: (loading: boolean) => void;
  setCurrentWeek: (week: string) => void;
}
