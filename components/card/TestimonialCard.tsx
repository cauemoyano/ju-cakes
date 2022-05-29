import { Box, Flex, Heading, Icon, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ImQuotesRight } from "react-icons/im";

type Props = {
  image: string;
  name: string;
  content: string;
  date: string;
  socialMedia: string;
};

const TestimonialCard = ({
  image,
  name,
  content,
  date,
  socialMedia,
}: Props) => {
  return (
    <Box
      role={"group"}
      p={6}
      maxW={"250px"}
      minW="220px"
      w={"full"}
      bg={"light.main"}
      boxShadow={"xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
      display="flex"
      flexDirection="column"
      /*  _hover={{ cursor: "pointer" }} */
    >
      <Box
        borderRadius={"50%"}
        marginTop="-20%"
        pos={"relative"}
        width={"100px"}
        mx="auto"
        _after={{
          transition: "all .3s ease",
          content: '""',
          w: "full",
          h: "full",
          pos: "absolute",
          top: 0,
          left: 0,
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "50%",
          filter: "blur(15px)",
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: "blur(18px)",
          },
        }}
      >
        <Image
          borderRadius={"50%"}
          width={"100px"}
          objectFit={"cover"}
          src={image}
        />
      </Box>
      <Box position="relative" zIndex="1">
        <Box
          position="absolute"
          top="0"
          left="0"
          zIndex="-1"
          bg="secondary.light"
          padding={2}
          borderRadius="50%"
        >
          <Icon as={ImQuotesRight} fontSize="2xl" color="light.main" />
        </Box>
        <Text padding="1.5rem 0 0 1rem">{content}</Text>
      </Box>
      <Flex flexDirection={"column"} pt={2} align={"center"} alignItems="end">
        <Text fontSize="sm">{date}</Text>
        <Heading as="h3" fontSize={"lg"} fontWeight={500}>
          {name}
        </Heading>
        <Text>
          <strong>via</strong> <i>{socialMedia}</i>
        </Text>
      </Flex>
    </Box>
  );
};

export default TestimonialCard;
