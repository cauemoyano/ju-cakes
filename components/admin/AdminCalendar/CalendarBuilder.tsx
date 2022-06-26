import {
  Box,
  HStack,
  Text,
  useCheckboxGroup,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
registerLocale("ptBR", ptBR);

import "react-datepicker/dist/react-datepicker.css";
import VariantBox from "../../primitives/VariantBox";
import VariantCheckBox from "../../primitives/VariantCheckBox";

type Props = {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  periods: string[];
  setPeriods: Dispatch<SetStateAction<string[]>>;
};
const CalendarBuilder = ({ date, setDate, periods, setPeriods }: Props) => {
  const options = ["Manhã", "Tarde"];

  const { getCheckboxProps } = useCheckboxGroup({
    defaultValue: periods,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (periods.includes(value)) {
      const newPeriods = [...periods];
      newPeriods.splice(periods.indexOf(value), 1);
      setPeriods(newPeriods);
    } else {
      setPeriods([...periods, value]);
    }
  };
  return (
    <VStack
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
        /*       dateFormat={"dd/MM/yy"} */
        selected={date}
        onChange={(date: Date) => setDate(date)}
        locale="ptBR"
        inline
        minDate={new Date()}
        excludeDates={[new Date(), new Date("2002-06-05")]}
        dateFormat="Pp"
      />
      <VStack align="center" py={4} overflow="auto">
        <Text fontSize="lg" fontWeight="bold">
          Marque o periodo que deseja indisponibilizar
        </Text>
        <HStack>
          {options.map((option) => {
            const checkbox = getCheckboxProps({
              value: option,
            });
            return (
              <VariantCheckBox
                key={option}
                {...checkbox}
                isChecked={periods.includes(option)}
                onChange={handleChange}
              />
            );
          })}
        </HStack>
      </VStack>
    </VStack>
  );
};

export default CalendarBuilder;
