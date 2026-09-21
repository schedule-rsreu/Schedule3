import React from "react";
import { useFetchFaculties } from "./useFetchFaculties";
import { useFetchToday } from "./useFetchToday";
import { useTelegramInit } from "./useTelegramInit";

export const useInit = () => {
  const { initializeTelegramWebApp } = useTelegramInit();
  const { fetchFaculties } = useFetchFaculties();
  const { fetchToday } = useFetchToday();

  React.useEffect(() => {
    void (async () => {
      const initDataRaw = await initializeTelegramWebApp();
      if (initDataRaw) {
        await Promise.all([fetchFaculties(initDataRaw), fetchToday(initDataRaw)]);
      }
    })();
  }, []);
};
