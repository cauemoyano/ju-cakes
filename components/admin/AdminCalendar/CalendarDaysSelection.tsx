import { Heading, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import DaySelectOption from "./DaySelectOption";

const CalendarDaysSelection = () => {
  const [fakeData, setFakeData] = useState<
    {
      name: string;
      periods: string[];
      weekday: number;
      id: string;
    }[]
  >([
    {
      name: "Segunda-feira",
      periods: [],
      weekday: 0,
      id: "01",
    },
    {
      name: "Terca-feira",
      periods: [],
      weekday: 1,
      id: "03",
    },
  ]);
  const fakeDataSorted = fakeData.sort((a, b) => a.weekday - b.weekday);
  return (
    <>
      <Heading as="h2" fontFamily={"inter"} fontSize="xl" mb={4}>
        Dias indisponiveis
      </Heading>
      <HStack align="start" flexWrap={"wrap"}>
        {fakeData.map((option) => (
          <DaySelectOption
            key={option.id}
            {...option}
            setFakeData={setFakeData}
            fakeData={fakeData}
          />
        ))}
      </HStack>
    </>
  );
};

export default CalendarDaysSelection;
