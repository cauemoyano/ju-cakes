import React, { Context, useCallback, useContext, useEffect } from "react";
import {
  CalendarContext,
  CalendarContextType,
} from "../../context/CalendarContext";
import { CalendarDay, CalendarItem } from "../../utilities/Types/Calendar";
import useErrorHandler from "../useErrorHandler/useErrorHandler";
import {
  createDoc,
  deleteDocument,
  getCollection,
  updateDoc,
} from "../FirebaseStorageService/FirebaseStorageService";

const MILISECONDS = 1000;

const useCalendar = () => {
  const { dates, setDates, days, setDays } = useContext(
    CalendarContext as Context<CalendarContextType>
  );

  const { setError } = useErrorHandler();

  useEffect(() => {
    (async () => {
      try {
        await updateCalendar();
        await getCalendarDays();
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  const createOrUpdateCalendarItem = useCallback(
    (data: CalendarItem, uid?: string) => {
      const { periods } = data;
      if (uid) {
        if (!periods.length) {
          return deleteDocument(uid, "calendar_dates");
        }
        return updateDoc("calendar_dates", uid, data);
      }

      return createDoc("calendar_dates", data);
    },
    []
  );

  const updateCalendarDay = useCallback((data: CalendarDay, uid: string) => {
    return updateDoc("calendar_days", uid, data);
  }, []);

  const updateCalendar = useCallback(async () => {
    setDates({ ...dates, loading: true });
    const data = (await getCollection("calendar_dates")) as CalendarItem[];
    setDates({ data, loading: false });
  }, []);
  const getCalendarDays = useCallback(async () => {
    setDays({ ...days, loading: true });
    const data = (await getCollection("calendar_days")) as CalendarDay[];
    setDays({ data, loading: false });
  }, []);

  const deleteCalendarItem = (id: string) => {
    return deleteDocument(id, "calendar_dates");
  };

  const getDateFromFirebase = (seconds: number) =>
    new Date(seconds * MILISECONDS);

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const formatDate = (date: Date) => {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  };

  const isAvailable = (date: Date) => {
    const day = date.getDay();
    const dbDay = days.data.find((d) => d.weekday === day);
    if (!dbDay) throw new Error();
    if (dbDay.periods.length > 0) {
      return true;
    }
    return false;
  };

  const periodUnavailable = (period: string, date: Date | null) => {
    if (!date) return false;
    const day = date.getDay();
    const dbDay = days.data.find((d) => d.weekday === day);
    return !dbDay?.periods.includes(period);
  };

  return {
    createOrUpdateCalendarItem,
    updateCalendar,
    deleteCalendarItem,
    dates,
    updateCalendarDay,
    getCalendarDays,
    days,
    getDateFromFirebase,
    formatDate,
    isAvailable,
    periodUnavailable,
  };
};

export default useCalendar;
