import React from "react";
import { useFetchFaculties } from "./useFetchFaculties";
import { useFetchToday } from "./useFetchToday";
import { useTelegramInit } from "./useTelegramInit";
import { loadInitialData } from "../utils/load-initial-data";

export const useInit = () => {
  const { initializeTelegramWebApp, fetchUser } = useTelegramInit();
  const { fetchFaculties } = useFetchFaculties();
  const { fetchToday } = useFetchToday();

  React.useEffect(() => {
    void loadInitialData(
      initializeTelegramWebApp,
      fetchUser,
      fetchFaculties,
      fetchToday
    );
  }, []);
};
