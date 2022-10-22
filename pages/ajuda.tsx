import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { NAV_PAGE_PADDING } from "../utilities/constants";

type TQuestion = {
  question: string;
  answer: string;
};

const questionsAndAnswers: TQuestion[] = [
  {
    question: "Question 1",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "Question 2",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "Question 3",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const Ajuda = () => {
  return (
    <Container
      paddingTop={NAV_PAGE_PADDING}
      px={0}
      maxWidth="container.lg"
      minHeight={"100vh"}
      display="flex"
      flexDirection={"column"}
    >
      <Heading
        as="h1"
        textAlign="center"
        fontSize={{ base: "4xl", md: "5xl" }}
        mb={{ base: 8, md: 16 }}
        mt={8}
      >
        Perguntas Frequentes
      </Heading>
      <Accordion width="min(100%, 600px)" mx="auto">
        {questionsAndAnswers.map((question, i) => (
          <QuestionItem key={i} {...question} />
        ))}
      </Accordion>
    </Container>
  );
};

const QuestionItem = ({ question, answer }: TQuestion) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box fontSize="2xl" color="primary.dark" flex="1" textAlign="left">
            {question}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{answer}</AccordionPanel>
    </AccordionItem>
  );
};

export default Ajuda;
