import { useStore } from "../store/store";
import { initSwipeBehavior, retrieveLaunchParams } from "@telegram-apps/sdk";
import { TelegramWebApp } from "../types/telegram";
import { userService } from "../services/user.service";
import { IGetUser } from "../types/auth";

export const useTelegramInit = () => {
  const setIsLoadingInit = useStore((state) => state.setIsLoadingInit);
  const setGroupAuth = useStore((state) => state.setGroupAuth);
  const setInitDataRaw = useStore((state) => state.setInitDataRaw);
  const setInitSchedule = useStore((state) => state.setInitSchedule);
  const setSelectedCourse = useStore((state) => state.setSelectedCourse);
  const setSelectedFaculty = useStore((state) => state.setSelectedFaculty);
  const setSelectedGroup = useStore((state) => state.setSelectedGroup);

  const initializeTelegramWebApp = async () => {
    try {
      const { telegramWebApp, initDataRaw, id } = getTelegramParams();

      if (!initDataRaw || !id) {
        throw new Error("No initDataRaw or user id found.");
      }

      await setupTelegramApp(telegramWebApp);

      const data = await userService.getUser(id, initDataRaw);

      if (data?.group) {
        applyUserData(data, initDataRaw);
      } else {
        setGroupAuth(null);
      }
    } catch (error) {
      console.log("Error initializing Telegram Web App:", error);
    } finally {
      setIsLoadingInit(false);
    }
  };

  const getTelegramParams = () => {
    const telegramWebApp = window.Telegram.WebApp;
    const { initDataRaw } = retrieveLaunchParams();
    const id = telegramWebApp.initDataUnsafe?.user?.id;
    return { telegramWebApp, initDataRaw, id };
  };

  const setupTelegramApp = async (telegramWebApp: TelegramWebApp) => {
    try {
      const [swipeBehavior] = initSwipeBehavior();
      swipeBehavior.disableVerticalSwipe();
    } catch (error) {
      console.log("Update your Telegram version:", error);
    }

    telegramWebApp.ready();
    telegramWebApp.expand();
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

  return { initializeTelegramWebApp };
};
