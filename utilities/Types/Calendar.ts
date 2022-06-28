export type CalendarItem = {
  date: Date | null;
  periods: string[];
  id?: string;
};

export type CalendarDay = {
  name: string;
  periods: string[];
  weekday: number;
  id: string;
};
