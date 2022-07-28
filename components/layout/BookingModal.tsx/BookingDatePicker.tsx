import { Box } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
registerLocale("ptBR", ptBR);

import "react-datepicker/dist/react-datepicker.css";
import useCalendar from "../../../services/useCalendar/useCalendar";

type Props = {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  isAvailable: (date: Date) => boolean;
};
const BookingDatePicker = ({ date, setDate, isAvailable }: Props) => {
  return (
    <Box
      py={4}
      display="flex"
      sx={{
        ">div": { margin: "0 auto" },
        ".react-datepicker": { border: "none", boxShadow: "lg" },
        ".react-datepicker>button>span": {
          _before: {
            height: "12px",
            width: "12px",
            top: "8px",
            borderColor: "primary.dark",
          },
        },
        ".react-datepicker__header": {
          borderBottom: "none",
          backgroundColor: "primary.light",
        },
        ".react-datepicker__current-month": {
          textTransform: "uppercase",
          fontFamily: "eczar",
          fontWeight: 500,
        },
        ".react-datepicker__day--keyboard-selected, .react-datepicker__day--selected":
          {
            backgroundColor: "secondary.dark",
          },
        ".react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected":
          {
            backgroundColor: "secondary.dark",
          },
      }}
    >
      <DatePicker
        selected={date}
        onChange={(date: Date) => setDate(date)}
        locale="ptBR"
        inline
        minDate={new Date()}
        excludeDates={[new Date(), new Date("2002-06-05")]}
        dateFormat="Pp"
        filterDate={isAvailable}
      />
    </Box>
  );
};

export default BookingDatePicker;
