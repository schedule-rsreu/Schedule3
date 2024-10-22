import React from "react";
import { useStore } from "../store/store";
import { initSwipeBehavior, retrieveLaunchParams } from "@telegram-apps/sdk";
import { userService } from "../services/user.service";
import { IGetUser } from "../types/auth";
import { TelegramWebApp } from "../types/telegram";
import { scheduleService } from "../services/schedule.service";
import { dayService } from "../services/day.service";

export const useInitialization = () => {
  const setSelectedCourse = useStore((state) => state.setSelectedCourse);
  const setSelectedFaculty = useStore((state) => state.setSelectedFaculty);
  const setSelectedGroup = useStore((state) => state.setSelectedGroup);
  const setFaculties = useStore((state) => state.setFaculties);

  const setSelectedDay = useStore((state) => state.setSelectedDay);
  const setSelectedDayEn = useStore((state) => state.setSelectedDayEn);
  const setCurrentDay = useStore((state) => state.setCurrentDay);
  const setSelectedWeek = useStore((state) => state.setSelectedWeek);
  const setSelectedWeekEn = useStore((state) => state.setSelectedWeekEn);
  const setCurrentWeek = useStore((state) => state.setCurrentWeek);

  const setGroupAuth = useStore((state) => state.setGroupAuth);
  const setInitDataRaw = useStore((state) => state.setInitDataRaw);
  const setInitSchedule = useStore((state) => state.setInitSchedule);

  const setIsLoadingInit = useStore((state) => state.setIsLoadingInit);
  const setIsLoadingToday = useStore((state) => state.setIsLoadingToday);
  const setIsLoadingFaculties = useStore(
    (state) => state.setIsLoadingFaculties
  );

  React.useEffect(() => {
    const initializeTelegramWebApp = async () => {
      try {
        const { telegramWebApp, initDataRaw, id } = getTelegramParams();

        if (!initDataRaw || !id) {
          throw new Error("No initDataRaw or user id found.");
        }

        await setupTelegramApp(telegramWebApp);

        const data = await userService.getUser(id, initDataRaw);

        if (data?.group) applyUserData(data, initDataRaw);
      } catch (error) {
        console.log("Error initializing Telegram Web App:", error);
      } finally {
        setIsLoadingInit(false);
      }
    };

    const fetchFaculties = async () => {
      try {
        const data = await scheduleService.getFaculties();

        setFaculties(data.faculties);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setFaculties(["иэф", "фаиту", "фвт", "фрт", "фэ"]);
        }
      } finally {
        setIsLoadingFaculties(false);
      }
    };

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
        if (error instanceof Error) {
          console.error(error.message);
          setSelectedDay("Пн");
          setSelectedDayEn("monday");
          setCurrentDay("Пн");
          setSelectedWeek("ЧИСЛИТЕЛЬ");
          setSelectedWeekEn("numerator");
          setCurrentWeek("ЧИСЛИТЕЛЬ");
        }
      } finally {
        setIsLoadingToday(false);
      }
    };

    const getTelegramParams = () => {
      const telegramWebApp = window.Telegram.WebApp;
      const { initDataRaw } = retrieveLaunchParams();
      const id = telegramWebApp.initDataUnsafe?.user?.id;
      return { telegramWebApp, initDataRaw, id };
    };

    const setupTelegramApp = async (telegramWebApp: TelegramWebApp) => {
      const [swipeBehavior] = initSwipeBehavior();
      telegramWebApp.ready();
      telegramWebApp.expand();
      swipeBehavior.disableVerticalSwipe();
    };

    const applyUserData = (data: IGetUser, initDataRaw: string) => {
      setGroupAuth(data.group);
      setInitDataRaw(initDataRaw);
      setInitSchedule(data.schedule.schedule);
      setSelectedCourse(data.schedule.course);
      setSelectedFaculty({
        value: data.schedule.faculty.toUpperCase(),
        label: data.schedule.faculty.toUpperCase(),
      });
      setSelectedGroup({
        value: data.schedule.group.toUpperCase(),
        label: data.schedule.group.toUpperCase(),
      });
    };

    initializeTelegramWebApp();
    fetchFaculties();
    fetchToday();
  }, []);
};
