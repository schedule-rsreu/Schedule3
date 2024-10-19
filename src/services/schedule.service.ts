import axios from "axios";
import {
  ICoursesByFaculty,
  IFaculties,
  IGroupsByCourseAndFaculty,
  IScheduleByGroup,
} from "../types/schedule";

class ScheduleService {
  private URL = "https://api.schedule.vingp.dev/api/v1/schedule";

  async getFaculties() {
    const { data } = await axios.get<IFaculties>(`${this.URL}/faculties`);

    return data;
  }

  async getCoursesByFaculty(faculty: string, initDataRaw: string) {
    const { data } = await axios.get<ICoursesByFaculty>(
      `${this.URL}/courses?faculty=${faculty}`,
      {
        headers: {
          authorization: `tma ${initDataRaw}`,
        },
      }
    );

    return data;
  }

  async getGroupsByCourseAndFaculty(
    faculty: string,
    course: number,
    initDataRaw: string
  ) {
    const { data } = await axios.get<IGroupsByCourseAndFaculty>(
      `${this.URL}/groups?faculty=${faculty}&course=${course}`,
      {
        headers: {
          authorization: `tma ${initDataRaw}`,
        },
      }
    );

    return data;
  }

  async getSchedule(group: string, initDataRaw: string) {
    const { data } = await axios.get<IScheduleByGroup>(
      `${this.URL}/groups/${group}`,
      {
        headers: {
          authorization: `tma ${initDataRaw}`,
        },
      }
    );

    return data;
  }
}

export const scheduleService = new ScheduleService();
