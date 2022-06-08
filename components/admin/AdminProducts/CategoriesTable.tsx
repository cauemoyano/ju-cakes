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
} from "@chakra-ui/react";
import React from "react";

const CategoriesTable = ({
  onOpen,
  onDeleteOpen,
}: {
  onOpen: () => void;
  onDeleteOpen: () => void;
}) => {
  return (
    <TableContainer bg="gray.50" overflow="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontFamily={"inter"} color="primary.dark">
              Categoria
            </Th>
            <Th color="transparent">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr
          /*   onClick={onOpen} */
          >
            <Td>
              <Flex direction="row" alignItems="center">
                <Image src="/brownie-product-page.png" maxWidth="50px" mr={2} />
                <Text fontWeight={600}>Brownie</Text>
              </Flex>
            </Td>
            <Td>
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
  );
};

export default CategoriesTable;
