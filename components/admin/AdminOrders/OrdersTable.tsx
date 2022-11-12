import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useOrdersAdmin from "../../../services/useOrdersAdmin/useOrdersAdmin";
import { OrderData } from "../../../utilities/Types/Orders";
import SimpleModal from "../../layout/modal/SimpleModal";
import AdminOrderDetails from "./AdminOrderDetails";

const OrdersTable = () => {
  const { filteredOrders } = useOrdersAdmin();
  const [showOrderDetails, setShowOrderDetails] = useState<OrderData | null>(
    null
  );
  const header = <Heading fontSize={"3xl"}>Detalhes da Ordem</Heading>;
  const footer = (
    <Button onClick={() => setShowOrderDetails(null)}>Fechar</Button>
  );
  return (
    <>
      <TableContainer
        bg="whiteAlpha.900"
        borderRadius={"md"}
        boxShadow="md"
        p={{ lg: 4 }}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th px={2} fontFamily="inter" fontSize="sm">
                ORDEM
              </Th>
              <Th px={2} fontFamily="inter" fontSize="sm">
                Data de entrega
              </Th>
              <Th px={2} fontFamily="inter" fontSize="sm">
                Nome
              </Th>
              <Th px={2} textAlign="center" fontFamily="inter" fontSize="sm">
                Items
              </Th>
              <Th px={2} textAlign="center" fontFamily="inter" fontSize="sm">
                Valor (R$)
              </Th>
              <Th px={2} fontFamily="inter" fontSize="sm">
                Status
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredOrders.map((order) => (
              <OrderTableItem
                key={order.id}
                order={order}
                setShowOrderDetails={setShowOrderDetails}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <SimpleModal
        header={header}
        footer={footer}
        isOpen={!!showOrderDetails}
        onClose={() => setShowOrderDetails(null)}
      >
        {showOrderDetails ? (
          <AdminOrderDetails id={showOrderDetails.id} />
        ) : null}
      </SimpleModal>
    </>
  );
};

const OrderTableItem = ({
  order,
  setShowOrderDetails,
}: {
  order: OrderData;
  setShowOrderDetails: (value: React.SetStateAction<OrderData | null>) => void;
}) => {
  const { name, dateAndPeriod, email, phone, deliveryStatus, cart, id } = order;
  const deliveryDate = dateAndPeriod
    ? `${new Date(dateAndPeriod.date).toLocaleDateString("pt-BR")} - ${
        dateAndPeriod.period
      }`
    : null;
  const { getCartItemsQty, getCartAmount } = useOrdersAdmin();
  return (
    <Tr
      onClick={() => setShowOrderDetails(order)}
      cursor="pointer"
      transition="all 0.5s"
      _hover={{ backgroundColor: "primary.light" }}
    >
      <Td px={2} w="fit-content">
        {id}
      </Td>
      <Td px={2} w="fit-content">
        {deliveryDate}
      </Td>
      <Td px={2} maxWidth="150px" textOverflow={"ellipsis"} overflow="hidden">
        {name}
      </Td>
      <Td px={2} textAlign="center">
        {getCartItemsQty(cart)}
      </Td>
      <Td px={2} textAlign="center">
        {getCartAmount(cart)}
      </Td>
      <Td px={2}>
        <Tag
          colorScheme={deliveryStatus === "complete" ? "green" : "red"}
          borderRadius="full"
        >
          {deliveryStatus === "complete" ? "Confirmado" : "Pendente"}
        </Tag>
      </Td>
    </Tr>
  );
};

export default OrdersTable;
