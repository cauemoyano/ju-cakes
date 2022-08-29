import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { formatCurrency } from "../../utilities/auxFunctions";
import { Product } from "../../utilities/Types/Products";
import CustomLink from "../primitives/CustomLink";

const ProductCard = ({ ...product }: Product) => {
  const clickLink = (e: React.MouseEvent) => {
    const li = (e.target as HTMLElement).closest("li");
    li?.querySelector("a")?.click();
  };

  const { variants, name, id, image, description } = product;

  const minorPrice = variants
    ? variants.reduce(
        (memo, cur) => (cur.price < memo ? cur.price : memo),
        variants[0].price
      )
    : 0;

  return (
    <CustomLink
      href={`/produto/${id as string}`}
      _hover={{ textDecoration: "none" }}
    >
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
        _hover={{ cursor: "pointer" }}
        onClick={(e) => clickLink(e)}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={image}
          />
        </Box>
        <Stack pt={10} align={"start"}>
          <Heading
            as="h3"
            fontSize={"2xl"}
            fontFamily={"body"}
            fontWeight={500}
          >
            <Text>{name}</Text>
          </Heading>
          <Text>{description}</Text>
          <Flex align={"center"} w="full" justifyContent="space-between">
            <Text fontWeight={500} fontSize={"xl"}>
              A partir de:
            </Text>
            <Text fontWeight={600} fontSize={"xl"}>
              {formatCurrency(minorPrice)}
            </Text>
          </Flex>
        </Stack>
      </Box>
    </CustomLink>
  );
};

export default ProductCard;
