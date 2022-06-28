import { Box, Flex, VStack } from "@chakra-ui/react";
import React from "react";
import ReactDatePicker from "react-datepicker";
import useCalendar from "../../../services/useCalendar/useCalendar";

const ScheduleSummary = () => {
  const { days, dates, getDateFromFirebase } = useCalendar();
  const getDateUnavailable = (date: Date) =>
    dates.data.find(
      (item) =>
        getDateFromFirebase((item.date as any).seconds).getTime() ===
        date.getTime()
    );

  const getDayUnavailable = (date: Date) =>
    days.data.find((d) => d.weekday === date.getDay());

  const applyClass = (date: Date) => {
    const dateUnavailable = getDateUnavailable(date);
    let unavailablePeriods = [0, 0];
    if (dateUnavailable) {
      if (dateUnavailable.periods.includes("Manhã")) unavailablePeriods[0] = 1;
      if (dateUnavailable.periods.includes("Tarde")) unavailablePeriods[1] = 1;
    }
    const day = getDayUnavailable(date);
    if (!day?.periods.includes("Manhã")) unavailablePeriods[0] = 1;
    if (!day?.periods.includes("Tarde")) unavailablePeriods[1] = 1;

    let result = null;
    switch (unavailablePeriods.join("")) {
      case "10":
        result = "morning";
        break;
      case "01":
        result = "afternoon";
        break;
      case "11":
        result = "full";
        break;
      case "00":
        result = null;
        break;
    }
    return result;
  };

  return (
    <Box
      sx={{
        ".morning": {
          background:
            "linear-gradient(to top left, #fff 0%, #fff 50%, #FF99C9 50%, #FF99C9 100%)!important",
        },
        ".afternoon": {
          background:
            "linear-gradient(to bottom right, #fff 0%, #fff 50%, #FF99C9 50%, #FF99C9 100%)!important",
        },
        ".full": {
          bg: "#FF99C9!important",
        },
        ".react-datepicker": {
          bg: "transparent",
          border: "none",
        },
        ".react-datepicker__day--keyboard-selected": {
          background: "white;",
          color: "black",
        },
        ".react-datepicker__header": {
          bg: "transparent",
          textTransform: "capitalize",
        },
        ".react-datepicker__current-month": {
          color: "secondary.dark",
        },
        ".react-datepicker__navigation-icon::before": {
          borderColor: "primary.dark",
        },
      }}
    >
      <ReactDatePicker
        /*       dateFormat={"dd/MM/yy"} */
        /* selected={date} */
        onChange={(date: Date) => {}}
        locale="ptBR"
        inline
        minDate={new Date()}
        excludeDates={[new Date()]}
        dateFormat="Pp"
        readOnly={true}
        dayClassName={applyClass}
      />
      <VStack align="start" ml={4}>
        <Flex>
          <Box
            width="27px"
            height="27px"
            background="linear-gradient(to top left, #fff 0%, #fff 50%, #FF99C9 50%, #FF99C9 100%)"
            mr={4}
          ></Box>
          Manhã indisponível
        </Flex>
        <Flex>
          <Box
            width="27px"
            height="27px"
            background="linear-gradient(to bottom right, #fff 0%, #fff 50%, #FF99C9 50%, #FF99C9 100%)"
            mr={4}
          ></Box>
          Tarde indisponível
        </Flex>
        <Flex>
          <Box width="27px" height="27px" bg="primary.main" mr={4}></Box>Dia
          indisponível
        </Flex>
      </VStack>
    </Box>
  );
};

export default ScheduleSummary;
