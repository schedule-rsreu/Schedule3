import axios from "axios";
import { ICurrentDay } from "../types/schedule";

class DayService {
  private URL = "https://api.rsreu-schedule.ru/api/v1/schedule";

  async getToday(initDataRaw: string) {
    const { data } = await axios.get<ICurrentDay>(`${this.URL}/day`, {
      headers: {
        authorization: `tma ${initDataRaw}`,
      },
    });

    return data;
  }
}

export const dayService = new DayService();
