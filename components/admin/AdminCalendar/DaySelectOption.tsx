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

type Props = {
  name: string;
  periods: string[];
  weekday: number;
  id: string;
  fakeData: {
    name: string;
    periods: string[];
    weekday: number;
    id: string;
  }[];
  setFakeData: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        periods: string[];
        weekday: number;
        id: string;
      }[]
    >
  >;
};

const DaySelectOption = ({
  name,
  periods,
  id,
  fakeData,
  setFakeData,
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newData = [...fakeData];
    const day = fakeData.find((item) => item.id === id);
    if (!day) return;
    newData.splice(newData.indexOf(day), 1);
    const { periods } = day;
    if (periods.includes(e.target.value)) {
      const newPeriods = [...periods];
      newPeriods.splice(newPeriods.indexOf(e.target.value), 1);
      day.periods = newPeriods;
    } else {
      day.periods = [...periods, e.target.value];
    }

    setFakeData([...newData, day]);
  };
  const morningChecked = periods.includes("Manhã");
  const afternoonChecked = periods.includes("Tarde");
  return (
    <Accordion allowToggle>
      <AccordionItem width="200px" border="0">
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
              <CheckboxGroup colorScheme="primaryNumbered" defaultValue={[]}>
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  <Checkbox
                    value="Manhã"
                    isChecked={periods.includes("Manhã")}
                    onChange={handleChange}
                  >
                    Manhã
                  </Checkbox>
                  <Checkbox
                    value="Tarde"
                    isChecked={periods.includes("Tarde")}
                    onChange={handleChange}
                  >
                    Tarde
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default DaySelectOption;
