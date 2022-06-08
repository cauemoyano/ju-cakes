import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";

const NameFilter = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) =>
    setValue((e.target as HTMLInputElement).value);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("filter");
  };
  return (
    <form onSubmit={handleFilter}>
      <InputGroup mb={4} maxWidth={"300px"}>
        <Input
          type="search"
          value={value}
          onChange={handleChange}
          placeholder="Filtrar por nome"
        />
        <InputRightElement
          children={
            <IconButton
              type="submit"
              aria-label="Procurar por nome"
              icon={<SearchIcon />}
            />
          }
        />
      </InputGroup>
    </form>
  );
};

export default NameFilter;
