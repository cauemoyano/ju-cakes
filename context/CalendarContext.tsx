import { createContext, Dispatch, SetStateAction, useState } from "react";
import { CalendarItem } from "../utilities/Types/Calendar";

export type CalendarContextType = {
  dates: {
    data: CalendarItem[];
    loading: boolean;
  };
  setDates: Dispatch<
    SetStateAction<{
      data: CalendarItem[];
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

  return (
    <CalendarContext.Provider value={{ dates, setDates }}>
      {children}
    </CalendarContext.Provider>
  );
};
