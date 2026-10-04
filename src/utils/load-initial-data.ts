export interface TelegramAuth {
  id: number;
  initDataRaw: string;
}

type Initialize = () => Promise<TelegramAuth | null>;
type FetchUser = (id: number, initDataRaw: string) => Promise<unknown>;
type FetchAuthorized = (initDataRaw: string) => Promise<unknown>;

export const loadInitialData = async (
  initialize: Initialize,
  fetchUser: FetchUser,
  fetchFaculties: FetchAuthorized,
  fetchToday: FetchAuthorized
) => {
  const auth = await initialize();
  if (!auth) return;

  await Promise.all([
    fetchUser(auth.id, auth.initDataRaw),
    fetchFaculties(auth.initDataRaw),
    fetchToday(auth.initDataRaw),
  ]);
};
