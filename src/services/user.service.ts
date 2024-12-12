import axios from "axios";
import { IGetUser } from "../types/auth";

class UserService {
  private URL = "https://user.rsreu-schedule.ru/user";

  async getUser(id: number, initDataRaw: string) {
    const { data } = await axios.get<IGetUser>(
      `${this.URL}/${id}?schedule=true`,
      {
        headers: {
          authorization: `tma ${initDataRaw}`,
        },
      }
    );

    return data;
  }
}

export const userService = new UserService();
