import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  ListItem,
  Link,
} from "@chakra-ui/react";

export default function CategoryMainCard({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  const clickLink = (e: React.MouseEvent) => {
    const li = (e.target as HTMLElement).closest("li");
    li?.querySelector("a")?.click();
  };

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
      <Stack pt={10} align={"center"}>
        <Heading as="h3" fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
          <Link href="#" _hover={{ textDecoration: "none" }}>
            Pao de Mel
          </Link>
        </Heading>
      </Stack>
    </Box>
  );
}
