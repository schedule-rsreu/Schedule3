import axios from "axios";
import {
  ICoursesByFaculty,
  IFaculties,
  IGroupsByCourseAndFaculty,
  IScheduleByGroup,
} from "../types/schedule";

class ScheduleService {
  private URL = "https://api.rsreu-schedule.ru/api/v1/schedule";

  async getFaculties() {
    const { data } = await axios.get<IFaculties>(`${this.URL}/faculties`);

    return data;
  }

  async getCoursesByFaculty(
    faculty: string,
    initDataRaw: string,
    signal: AbortSignal
  ) {
    try {
      const { data } = await axios.get<ICoursesByFaculty>(
        `${this.URL}/courses?faculty=${faculty}`,
        {
          headers: {
            authorization: `tma ${initDataRaw}`,
          },
          signal,
        }
      );

      return data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Course request cancelled");
      } else {
        throw error;
      }
    }
  }

  async getGroupsByCourseAndFaculty(
    faculty: string,
    course: number,
    initDataRaw: string,
    signal: AbortSignal
  ) {
    try {
      const { data } = await axios.get<IGroupsByCourseAndFaculty>(
        `${this.URL}/groups?faculty=${faculty}&course=${course}`,
        {
          headers: {
            authorization: `tma ${initDataRaw}`,
          },
          signal,
        }
      );

      return data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Group request cancelled");
      } else {
        throw error;
      }
    }
  }

  async getSchedule(group: string, initDataRaw: string, signal: AbortSignal) {
    try {
      const { data } = await axios.get<IScheduleByGroup>(
        `${this.URL}/groups/${group}`,
        {
          headers: {
            authorization: `tma ${initDataRaw}`,
          },
          signal,
        }
      );

      return data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Schedule request cancelled");
      } else {
        throw error;
      }
    }
  }
}

export const scheduleService = new ScheduleService();
