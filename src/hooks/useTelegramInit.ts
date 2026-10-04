import { useStore } from "../store/store";
import { initSwipeBehavior, retrieveLaunchParams } from "@telegram-apps/sdk";
import { TelegramWebApp } from "../types/telegram";
import { userService } from "../services/user.service";
import { IGetUser } from "../types/auth";
import { TelegramAuth } from "../utils/load-initial-data";

export const useTelegramInit = () => {
  const setIsLoadingInit = useStore((state) => state.setIsLoadingInit);
  const setGroupAuth = useStore((state) => state.setGroupAuth);
  const setInitDataRaw = useStore((state) => state.setInitDataRaw);
  const setInitSchedule = useStore((state) => state.setInitSchedule);
  const setSelectedCourse = useStore((state) => state.setSelectedCourse);
  const setSelectedFaculty = useStore((state) => state.setSelectedFaculty);
  const setSelectedGroup = useStore((state) => state.setSelectedGroup);

  const initializeTelegramWebApp = async (): Promise<TelegramAuth | null> => {
    try {
      await waitForTelegramWebApp();
      const params = getTelegramParams();
      const { initDataRaw } = params;
      const { telegramWebApp, id } = params;

      if (!initDataRaw || !id) {
        throw new Error("No initDataRaw or user id found.");
      }
      setInitDataRaw(initDataRaw);

      setupTelegramApp(telegramWebApp);
      return { id, initDataRaw };
    } catch (error) {
      console.log("Error initializing Telegram Web App:", error);
      setIsLoadingInit(false);
      return null;
    }
  };

  const fetchUser = async (id: number, initDataRaw: string) => {
    try {
      const data = await userService.getUser(id, initDataRaw);
      window.umami?.identify({
        id: `telegram:${data.telegram_id}`,
        telegram_username: data.telegram_username,
      });

      if (data?.group) {
        applyUserData(data);
      } else {
        setGroupAuth(null);
      }
    } catch (error) {
      console.log("Error initializing Telegram Web App:", error);
    } finally {
      setIsLoadingInit(false);
    }
  };

  const waitForTelegramWebApp = () => {
    if (window.Telegram?.WebApp) return Promise.resolve();

    const script = document.querySelector("#telegram-web-app");
    if (!script) return Promise.reject(new Error("Telegram SDK not found."));

    return new Promise<void>((resolve, reject) => {
      script.addEventListener("load", () => resolve(), { once: true });
      script.addEventListener(
        "error",
        () => reject(new Error("Telegram SDK failed to load.")),
        { once: true }
      );
    });
  };

  const getTelegramParams = () => {
    const telegramWebApp = window.Telegram.WebApp;
    const { initDataRaw } = retrieveLaunchParams();
    const id = telegramWebApp.initDataUnsafe?.user?.id;
    return { telegramWebApp, initDataRaw, id };
  };

  const setupTelegramApp = (telegramWebApp: TelegramWebApp) => {
    try {
      const [swipeBehavior] = initSwipeBehavior();
      swipeBehavior.disableVerticalSwipe();
    } catch (error) {
      console.log("Update your Telegram version:", error);
    }

    telegramWebApp.ready();
    telegramWebApp.expand();
  };

  const applyUserData = (data: IGetUser) => {
    setGroupAuth(data.group);
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

  return { initializeTelegramWebApp, fetchUser };
};
