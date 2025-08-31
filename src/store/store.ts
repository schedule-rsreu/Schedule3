import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { IStore } from "../types/store";

export const useStore = create<IStore>()(
  devtools(
    persist(
      (set) => ({
        selectedCourse: 1,
        selectedFaculty: null,
        selectedGroup: null,
        selectedWeek: null,
        selectedWeekEn: null,
        currentWeek: null,
        selectedDay: null,
        selectedDayEn: null,
        currentDay: null,
        faculties: null,
        initDataRaw: "",
        initSchedule: null,
        groupAuth: null,
        isLoadingInit: true,
        isLoadingToday: true,
        isLoadingFaculties: true,

        setSelectedCourse: (selectedCourse) =>
          set(
            (state) => ({
              ...state,
              selectedCourse,
            }),
            false,
            "setSelectedCourse"
          ),

        setSelectedFaculty: (selectedFaculty) =>
          set(
            (state) => ({
              ...state,
              selectedFaculty,
            }),
            false,
            "setSelectedFaculty"
          ),

        setSelectedGroup: (selectedGroup) =>
          set(
            (state) => ({
              ...state,
              selectedGroup,
            }),
            false,
            "setSelectedGroup"
          ),

        setSelectedWeek: (selectedWeek) =>
          set(
            (state) => ({
              ...state,
              selectedWeek,
            }),
            false,
            "setSelectedWeek"
          ),

        setSelectedWeekEn: (selectedWeekEn) =>
          set(
            (state) => ({
              ...state,
              selectedWeekEn,
            }),
            false,
            "setSelectedWeekEn"
          ),

        setCurrentWeek: (currentWeek) =>
          set((state) => ({
            ...state,
            currentWeek,
          })),

        setSelectedDay: (selectedDay) =>
          set(
            (state) => ({
              ...state,
              selectedDay,
            }),
            false,
            "setSelectedDay"
          ),

        setSelectedDayEn: (selectedDayEn) =>
          set(
            (state) => ({
              ...state,
              selectedDayEn,
            }),
            false,
            "setSelectedDayEn"
          ),

        setCurrentDay: (currentDay) =>
          set(
            (state) => ({
              ...state,
              currentDay,
            }),
            false,
            "setCurrentDay"
          ),

        setFaculties: (faculties) =>
          set(
            (state) => ({
              ...state,
              faculties,
            }),
            false,
            "setFaculties"
          ),

        setInitDataRaw: (initDataRaw) =>
          set(
            (state) => ({
              ...state,
              initDataRaw,
            }),
            false,
            "setInitDataRaw"
          ),

        setInitSchedule: (initSchedule) =>
          set(
            (state) => ({
              ...state,
              initSchedule,
            }),
            false,
            "setInitSchedule"
          ),

        setGroupAuth: (groupAuth) =>
          set(
            (state) => ({
              ...state,
              groupAuth,
            }),
            false,
            "setGroupAuth"
          ),

        setIsLoadingInit: (isLoadingInit) =>
          set(
            (state) => ({
              ...state,
              isLoadingInit,
            }),
            false,
            "setIsLoadingInit"
          ),

        setIsLoadingToday: (isLoadingToday) =>
          set(
            (state) => ({
              ...state,
              isLoadingToday,
            }),
            false,
            "setIsLoadingToday"
          ),

        setIsLoadingFaculties: (isLoadingFaculties) =>
          set(
            (state) => ({
              ...state,
              isLoadingFaculties,
            }),
            false,
            "setIsLoadingFaculties"
          ),
      }),
      {
        name: "schedule-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          selectedCourse: state.selectedCourse,
          selectedFaculty: state.selectedFaculty,
          selectedGroup: state.selectedGroup,
          groupAuth: state.groupAuth,
        }),
      }
    )
  )
);
