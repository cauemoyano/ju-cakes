import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { MdPanoramaFishEye } from "react-icons/md";
import ProductCard from "../../components/card/ProductCard";
import CategoriesCarousel from "../../components/slider/CategoriesCarousel";
import {
  getCollection,
  getDocsByQuery,
  getDocument,
} from "../../services/FirebaseStorageService/FirebaseStorageService";
import { NAV_PAGE_PADDING } from "../../utilities/constants";
import { Product } from "../../utilities/Types/Products";

const Category: NextPage = ({
  category,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { name } = router.query;
  return (
    <Box paddingTop={NAV_PAGE_PADDING}>
      <Flex>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="end"
          bg="primary.light"
          width={{ base: "100%", md: "50%" }}
        >
          <Box p={8} ml="auto" maxWidth="container.sm">
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl", xl: "6xl" }}>
              {category.name}
            </Heading>
            <Text>
              We make our bake-sale bestsellers in small batches and from
              top-shelf ingredients, just the way Mom made ‘em—perhaps even
              better? Either way, our selection of brownies and bars can’t be
              beat.
            </Text>
          </Box>
        </Box>
        <Box display={{ base: "none", md: "block" }} width="50%">
          <Image src={category.image} h="full" w="full" alt="" />{" "}
        </Box>
      </Flex>
      <Container maxWidth="container.lg" p={4}>
        <Grid
          as="ul"
          sx={{
            li: { listStyleType: "none" },
          }}
          templateColumns="repeat(auto-fill, 250px)"
          justifyContent="center"
          columnGap={{ base: "1rem", xl: "2rem" }}
          rowGap={{ base: "3rem", xl: "4rem" }}
          pt={16}
          position="relative"
          mb={8}
        >
          {(products as Product[]).map((product) => (
            <Box as="li" key={product.id}>
              <ProductCard {...product} />
            </Box>
          ))}
          {/*  <Box as="li">
            <ProductCard />
          </Box>
         */}
          <Box position="absolute" top="-1rem" right="0">
            <Image src="/Sparkle.svg" />
          </Box>
          <Box position="absolute" maxWidth="100px" bottom="0" left="0">
            <Image src="/Stars.svg" />
          </Box>
        </Grid>
      </Container>
      <Box
        w="100%"
        h={{ base: "5vh", lg: "10vh" }}
        bgGradient="linear(to-b, light.main, secondary.light)"
      />
      <Box bg="secondary.light">
        <Container maxWidth="container.xl" p={0}>
          <Flex direction={{ base: "column", md: "row" }}>
            <Box width={{ md: "30%" }} position="relative">
              <Heading pl={8} fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}>
                Veja tambem:
              </Heading>
            </Box>
            <Box width={{ md: "70%" }}>
              <CategoriesCarousel />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export async function getStaticPaths() {
  const categories = await getCollection("categories");
  const paths = categories.map((category) => ({ params: { id: category.id } }));
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let category = null;
  let products: { id: string }[] = [];
  if (params?.id) {
    category = await getDocument("categories", params.id as string);
    products = await getDocsByQuery(
      "products",
      "category",
      params.id as string
    );
  }

  return {
    props: { category, products },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
};

export default Category;
