import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useOrdersAdmin from "../../../services/useOrdersAdmin/useOrdersAdmin";
import { initialFilterState } from "./AdminOrders";

const FilterBox = () => {
  const { filter, setFilter } = useOrdersAdmin();
  const { query, status, startDate, endDate, sort } = filter;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
    setFilter((curInputs) => ({
      ...curInputs,
      [e.target.name]: e.target.value,
    }));
  const handleReset = () => setFilter(initialFilterState);
  return (
    <Box bg="whiteAlpha.900" p={4} borderRadius={"md"} boxShadow="md" w="full">
      <Accordion allowToggle border="transparent">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontSize={"xl"}>
                Filtros
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Flex flexDirection={"column"}>
              <Flex
                gap={4}
                justify="space-between"
                direction={{ base: "column", md: "row" }}
              >
                <FormControl mb={4}>
                  <FormLabel htmlFor="query">Nome</FormLabel>
                  <Input
                    name="query"
                    id="query"
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Ordem, nome ou email"
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <Select
                    id="status"
                    name="status"
                    placeholder=""
                    onChange={handleChange}
                    maxW="xs"
                    value={status}
                  >
                    <option value="all">Todos</option>
                    <option value="complete">Entregue</option>
                    <option value="pending">Pendente</option>
                  </Select>
                </FormControl>
              </Flex>
              <Flex gap={4} direction={{ base: "column", md: "row" }}>
                <FormControl mb={4}>
                  <FormLabel htmlFor="startDate">Datas</FormLabel>
                  <Flex direction={{ base: "column", md: "row" }}>
                    <Input
                      name="startDate"
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={handleChange}
                      placeholder="Data Inicial"
                    />
                    <Text mx={4} alignSelf="center">
                      até
                    </Text>
                    <Input
                      name="endDate"
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={handleChange}
                      placeholder="Data Final"
                    />
                  </Flex>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel htmlFor="sort">Organizar por:</FormLabel>
                  <Select
                    id="sort"
                    name="sort"
                    onChange={handleChange}
                    maxW="xs"
                    value={sort}
                  >
                    <option value="deliveryDate">Data de entrega</option>
                    <option value="orderDate">Data de pedido</option>
                    <option value="name">Nome</option>
                  </Select>
                </FormControl>
              </Flex>
              <HStack marginLeft={"auto"}>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  colorScheme={"primaryNumbered"}
                >
                  Resetar
                </Button>
              </HStack>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default FilterBox;
