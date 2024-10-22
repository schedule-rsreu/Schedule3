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
          set((state) => ({
            ...state,
            selectedCourse,
          })),

        setSelectedFaculty: (selectedFaculty) =>
          set((state) => ({
            ...state,
            selectedFaculty,
          })),

        setSelectedGroup: (selectedGroup) =>
          set((state) => ({
            ...state,
            selectedGroup,
          })),

        setSelectedWeek: (selectedWeek) =>
          set((state) => ({
            ...state,
            selectedWeek,
          })),

        setSelectedWeekEn: (selectedWeekEn) =>
          set((state) => ({
            ...state,
            selectedWeekEn,
          })),

        setCurrentWeek: (currentWeek) =>
          set((state) => ({
            ...state,
            currentWeek,
          })),

        setSelectedDay: (selectedDay) =>
          set((state) => ({
            ...state,
            selectedDay,
          })),

        setSelectedDayEn: (selectedDayEn) =>
          set((state) => ({
            ...state,
            selectedDayEn,
          })),

        setCurrentDay: (currentDay) =>
          set((state) => ({
            ...state,
            currentDay,
          })),

        setFaculties: (faculties) =>
          set((state) => ({
            ...state,
            faculties,
          })),

        setInitDataRaw: (initDataRaw) =>
          set((state) => ({
            ...state,
            initDataRaw,
          })),

        setInitSchedule: (initSchedule) =>
          set((state) => ({
            ...state,
            initSchedule,
          })),

        setGroupAuth: (groupAuth) =>
          set((state) => ({
            ...state,
            groupAuth,
          })),

        setIsLoadingInit: (isLoadingInit) =>
          set((state) => ({
            ...state,
            isLoadingInit,
          })),

        setIsLoadingToday: (isLoadingToday) =>
          set((state) => ({
            ...state,
            isLoadingToday,
          })),

        setIsLoadingFaculties: (isLoadingFaculties) =>
          set((state) => ({
            ...state,
            isLoadingFaculties,
          })),
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
