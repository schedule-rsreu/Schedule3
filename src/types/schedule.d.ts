export interface IFaculties {
  faculties: string[];
}

export interface ICoursesByFaculty {
  faculty: string;
  courses: number[];
}

export interface IGroupsByCourseAndFaculty {
  course: number;
  faculty: string;
  groups: string[];
}

export interface IScheduleByGroup {
  id: string;
  update_at: Date;
  file: string;
  file_hash: string;
  faculty: string;
  course: number;
  group: string;
  schedule: ISchedule;
}

export interface ISchedule {
  numerator: IDays;
  denominator: IDays;
}

export interface IDays {
  monday: IPair[];
  tuesday: IPair[];
  wednesday: IPair[];
  thursday: IPair[];
  friday: IPair[];
  saturday: IPair[];
}

export interface IPair {
  time: string;
  lesson: string;
}

export interface ICurrentDay {
  week_type: string;
  week_type_eng: string;
  day: string;
  day_ru: string;
  time: string;
}
