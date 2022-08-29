import {
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
import { formatCurrency } from "../../utilities/auxFunctions";
import { CartItem } from "../../utilities/Types/Cart";

type Props = {
  cart: CartItem[];
};

const ItemsTable = (props: Props) => {
  const { cart } = props;
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th fontFamily="inter">Nome</Th>
            <Th fontFamily="inter">Quantidade</Th>
            <Th fontFamily="inter">Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cart.map((item) => {
            const { id, name, price, variant, quantity } = item;
            return (
              <Tr key={id}>
                <Td>
                  <Text fontWeight={600}>
                    {name}
                    <br />
                    <Text as="span" fontWeight={400}>
                      {variant}
                    </Text>
                  </Text>
                </Td>
                <Td textAlign="center">{quantity}</Td>
                <Td>{formatCurrency(quantity * price)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
