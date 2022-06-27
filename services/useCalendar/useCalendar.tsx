import React, { Context, useCallback, useContext, useEffect } from "react";
import {
  CalendarContext,
  CalendarContextType,
} from "../../context/CalendarContext";
import { CalendarItem } from "../../utilities/Types/Calendar";
import useErrorHandler from "../useErrorHandler/useErrorHandler";
import { useFirebaseStorage } from "../useFirebaseStorage/useFirebaseStorage";

const useCalendar = () => {
  const { dates, setDates } = useContext(
    CalendarContext as Context<CalendarContextType>
  );
  const { updateDoc, createDoc, getCollection, deleteDocument } =
    useFirebaseStorage();
  const { setError } = useErrorHandler();

  useEffect(() => {
    (async () => {
      try {
        await updateCalendar();
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

  const updateCalendar = useCallback(async () => {
    setDates({ ...dates, loading: true });
    const data = (await getCollection("calendar_dates")) as CalendarItem[];
    setDates({ data, loading: false });
  }, []);

  const deleteCalendarItem = (id: string) => {
    return deleteDocument(id, "calendar_dates");
  };

  return {
    createOrUpdateCalendarItem,
    updateCalendar,
    deleteCalendarItem,
    dates,
  };
};

export default useCalendar;
