import { IScheduleByGroup } from "./schedule";

export interface IGetUser {
  id: number;
  telegram_id: number;
  telegram_username: string;
  group: string | null;
  notification_sound: boolean;
  schedule: IScheduleByGroup;
}
