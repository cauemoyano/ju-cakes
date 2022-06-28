import { createContext, Dispatch, SetStateAction, useState } from "react";
import { CalendarDay, CalendarItem } from "../utilities/Types/Calendar";

export type CalendarContextType = {
  dates: {
    data: CalendarItem[];
    loading: boolean;
  };
  days: {
    data: CalendarDay[];
    loading: boolean;
  };
  setDates: Dispatch<
    SetStateAction<{
      data: CalendarItem[];
      loading: boolean;
    }>
  >;
  setDays: Dispatch<
    SetStateAction<{
      data: CalendarDay[];
      loading: boolean;
    }>
  >;
};

export const CalendarContext = createContext<CalendarContextType | {}>({});

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dates, setDates] = useState<{
    data: CalendarItem[];
    loading: boolean;
  }>({ data: [], loading: false });
  const [days, setDays] = useState<{
    data: CalendarDay[];
    loading: boolean;
  }>({ data: [], loading: false });

  return (
    <CalendarContext.Provider value={{ dates, setDates, days, setDays }}>
      {children}
    </CalendarContext.Provider>
  );
};
