export interface IFacultyOption {
  value: string;
  label: string;
  isDisabled?: boolean;
}

export interface IGroupOption {
  value: string;
  label: string;
}

export interface IStoredGroup {
  state: {
    faculty: string;
    selectedCourse: number;
    group: string;
  };
  version: number;
}
