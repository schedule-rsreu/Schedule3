import axios from "axios";
import { ICurrentDay } from "../types/schedule";

class DayService {
  private URL = "https://api.schedule.vingp.dev/api/v1/schedule";

  async getToday() {
    const { data } = await axios.get<ICurrentDay>(`${this.URL}/day`);

    return data;
  }
}

export const dayService = new DayService();
