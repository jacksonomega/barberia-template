export interface EmployeeServiceItem {
  id: number;
  name: string;
  price: number;
  duration: number;
}

export interface EmployeeScheduleItem {
  weekday: number;
  start_time: string;
  end_time: string;
  break_start: string;
  break_end: string;
}

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  active: boolean;
  services: EmployeeServiceItem[];
  schedules: EmployeeScheduleItem[];
}

export type BarberPublic = Employee;
