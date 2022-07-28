import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import useCart from "../../services/useCart/useCart";
import { CartItem } from "../../utilities/Types/Cart";
import DesktopTableItem from "./DesktopTableItem";

const DesktopProductsTable = ({ cart }: { cart: CartItem[] }) => {
  return (
    <TableContainer flex="1">
      <Table variant="simple">
        <TableCaption fontFamily="inter">
          Items adicionados ao Carrinho
        </TableCaption>
        <Thead>
          <Tr>
            <Th fontFamily="inter">Produto</Th>
            <Th fontFamily="inter" textAlign="center">
              Quantidade
            </Th>
            <Th fontFamily="inter" textAlign="center">
              Total
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {cart.map((item) => (
            <DesktopTableItem key={`${item.id}-${item.variant}`} item={item} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DesktopProductsTable;
