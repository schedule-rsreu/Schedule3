import React from "react";
import { useFetchFaculties } from "./useFetchFaculties";
import { useFetchToday } from "./useFetchToday";
import { useTelegramInit } from "./useTelegramInit";

export const useInit = () => {
  const { initializeTelegramWebApp } = useTelegramInit();
  const { fetchFaculties } = useFetchFaculties();
  const { fetchToday } = useFetchToday();

  React.useEffect(() => {
    initializeTelegramWebApp();
    fetchFaculties();
    fetchToday();
  }, []);
};
