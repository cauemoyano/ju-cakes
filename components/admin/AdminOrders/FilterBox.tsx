import {
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

const initialInputs = {
  query: "",
  status: "all",
  startDate: "",
  endDate: "",
  sort: "deliveryDate",
};

const FilterBox = () => {
  const [inputs, setInputs] = useState<typeof initialInputs>(initialInputs);
  const { query, status, startDate, endDate, sort } = inputs;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
    setInputs((curInputs) => ({
      ...curInputs,
      [e.target.name]: e.target.value,
    }));
  const handleReset = () => setInputs(initialInputs);
  return (
    <Flex
      p={4}
      bg="whiteAlpha.900"
      borderRadius={"md"}
      boxShadow="md"
      flexDirection={"column"}
    >
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
            <option value="delivered">Entregue</option>
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
        <Button colorScheme={"primaryNumbered"}>Aplicar</Button>
      </HStack>
    </Flex>
  );
};

export default FilterBox;
