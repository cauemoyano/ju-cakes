import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  IconButton,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import ProductModal from "./ProductModal";

const ProductsTable = ({ onDeleteOpen }: { onDeleteOpen: () => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <TableContainer bg="gray.50" overflow="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontFamily={"inter"} color="primary.dark">
                Produto
              </Th>
              <Th display={{ base: "block", md: "none" }} color="transparent">
                Actions
              </Th>
              <Th fontFamily={"inter"} color="primary.dark">
                Categoria
              </Th>
              <Th display={{ base: "none", md: "block" }} color="transparent">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr
            /*   onClick={onOpen} */
            >
              <Td>
                <Flex direction="row" alignItems="center">
                  <Image
                    src="/brownie-product-page.png"
                    maxWidth="50px"
                    mr={2}
                  />
                  <Text fontWeight={600}>Brownie 2</Text>
                </Flex>
              </Td>
              <Td display={{ base: "block", md: "none" }}>
                <HStack>
                  <IconButton
                    onClick={onOpen}
                    variant="ghost"
                    colorScheme={"cyan"}
                    size="lg"
                    aria-label="Editar produto"
                    icon={<EditIcon />}
                  />
                  <IconButton
                    onClick={onDeleteOpen}
                    variant="ghost"
                    colorScheme={"red"}
                    size="lg"
                    aria-label="Deletar produto"
                    icon={<DeleteIcon />}
                  />
                </HStack>
              </Td>
              <Td>Brownie</Td>
              <Td display={{ base: "none", md: "block" }}>
                <HStack>
                  <IconButton
                    onClick={onOpen}
                    variant="ghost"
                    colorScheme={"cyan"}
                    size="lg"
                    aria-label="Editar produto"
                    icon={<EditIcon />}
                  />
                  <IconButton
                    onClick={onDeleteOpen}
                    variant="ghost"
                    colorScheme={"red"}
                    size="lg"
                    aria-label="Deletar produto"
                    icon={<DeleteIcon />}
                  />
                </HStack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <ProductModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ProductsTable;
