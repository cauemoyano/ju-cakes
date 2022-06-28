import { CheckIcon, NotAllowedIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  StatArrow,
  StatHelpText,
  VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import useCalendar from "../../../services/useCalendar/useCalendar";
import useErrorHandler from "../../../services/useErrorHandler/useErrorHandler";

type Props = {
  day: { name: string; periods: string[]; weekday: number; id: string };
  loading: boolean;
};

const DaySelectOption = ({ day, loading }: Props) => {
  const { updateCalendarDay, getCalendarDays } = useCalendar();
  const { setError } = useErrorHandler();
  const { name, id, periods } = day;

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (periods.includes(e.target.value)) {
        const newPeriods = [...periods];
        newPeriods.splice(newPeriods.indexOf(e.target.value), 1);
        day["periods"] = newPeriods;
      } else {
        day["periods"] = [...periods, e.target.value];
      }
      await updateCalendarDay(day, id);
      await getCalendarDays();
    } catch (error) {
      setError(error);
    }
  };
  const morningChecked = periods.includes("Manhã");
  const afternoonChecked = periods.includes("Tarde");

  return (
    <Accordion allowToggle>
      <AccordionItem width="200px" border="0" m={0}>
        {({ isExpanded }) => (
          <>
            <h3>
              <AccordionButton
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                _focus={{
                  boxShadow: "outline",
                }}
                bg={`${isExpanded && "primary.light"}`}
                color={`${isExpanded && "primary.dark"}`}
                borderColor={`${isExpanded && "primary.dark"}`}
              >
                <VStack align="start">
                  <Box flex="1">{name}</Box>
                  <VStack align="start">
                    <StatHelpText
                      color={`${morningChecked ? "green" : "gray.300"}`}
                      as={`${morningChecked ? "p" : "s"}`}
                    >
                      Manhã
                      {morningChecked ? (
                        <CheckIcon ml={2} />
                      ) : (
                        <NotAllowedIcon ml={2} />
                      )}
                    </StatHelpText>
                    <StatHelpText
                      color={`${afternoonChecked ? "green" : "gray.300"}`}
                      as={`${afternoonChecked ? "p" : "s"}`}
                    >
                      Tarde
                      {afternoonChecked ? (
                        <CheckIcon ml={2} />
                      ) : (
                        <NotAllowedIcon ml={2} />
                      )}
                    </StatHelpText>
                  </VStack>
                </VStack>
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                <Checkbox
                  value="Manhã"
                  isChecked={morningChecked}
                  onChange={handleChange}
                  disabled={loading}
                  colorScheme="primaryNumbered"
                >
                  Manhã
                </Checkbox>
                <Checkbox
                  value="Tarde"
                  isChecked={afternoonChecked}
                  onChange={handleChange}
                  disabled={loading}
                  colorScheme="primaryNumbered"
                >
                  Tarde
                </Checkbox>
              </Stack>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default DaySelectOption;
