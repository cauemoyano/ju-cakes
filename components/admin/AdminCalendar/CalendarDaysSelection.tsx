import { Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import useCalendar from "../../../services/useCalendar/useCalendar";
import DaySelectOption from "./DaySelectOption";

const CalendarDaysSelection = () => {
  const { days } = useCalendar();
  const daysSorted = days.data.sort((a, b) => a.weekday - b.weekday);
  return (
    <>
      <Heading as="h2" fontFamily={"inter"} fontSize="xl" mb={4}>
        Dias indisponiveis
      </Heading>
      <Flex
        align={{ base: "center", sm: "start" }}
        justifyContent={{ base: "center", sm: "start" }}
        direction="row"
        flexWrap={"wrap"}
        gap="1rem"
      >
        {daysSorted.map((day) => (
          <DaySelectOption key={day.id} day={day} loading={days.loading} />
        ))}
      </Flex>
    </>
  );
};

export default CalendarDaysSelection;
