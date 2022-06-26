import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useCalendar from "../../../services/useCalendar/useCalendar";
import useErrorHandler from "../../../services/useErrorHandler/useErrorHandler";
import { CalendarItem } from "../../../utilities/Types/Calendar";
import AlertModal from "../../layout/modal/AlertModal";
import CalendarModal from "./CalendarModal";

const initialValues: CalendarItem = { date: null, periods: [] };

const CalendarTable = () => {
  const { dates, deleteCalendarItem, updateCalendar } = useCalendar();
  const [modalInputs, setModalInputs] = useState<CalendarItem>(initialValues);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [deleteId, setDeleteId] = useState("");
  const toast = useToast();
  const { setError } = useErrorHandler();

  const MILISECONDS = 1000;

  const handleEdit = (item: CalendarItem) => {
    setModalInputs({
      ...item,
      date: new Date((item.date as any).seconds * MILISECONDS),
    });
    onOpen();
  };

  const handleClose = () => {
    setModalInputs(initialValues);
    onClose();
  };

  const handleDeleteModal = async (id: string) => {
    setDeleteId(id);
    onDeleteOpen();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteCalendarItem(deleteId);
      await updateCalendar();
      toast({
        title: "Data excluída.",
        description: "A data foi excluída com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      clearDelete();
    } catch (err) {
      setError(err);
    }
  };
  const clearDelete = () => {
    setDeleteId("");
    onDeleteClose();
  };

  return (
    <>
      <Heading as="h2" fontFamily={"inter"} fontSize="xl" mb={4}>
        Datas indisponiveis
      </Heading>
      <Button
        leftIcon={<AddIcon />}
        onClick={onOpen}
        mb={4}
        colorScheme="primaryNumbered"
      >
        Adicionar Data
      </Button>
      <TableContainer bg="gray.50" overflow="auto">
        {dates.loading && (
          <Text data-testid="loading-dates">Carregando datas...</Text>
        )}
        {!dates.loading && dates.data.length === 0 && (
          <Text data-testid="no-dates">Não há datas para exibir.</Text>
        )}
        {!dates.loading && dates.data.length > 0 && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontFamily={"inter"} color="primary.dark">
                  Data
                </Th>
                <Th fontFamily={"inter"} color="primary.dark">
                  Período
                </Th>
                <Th color="transparent">Actions</Th>
              </Tr>
            </Thead>
            <Tbody data-testid="dates-wrapper">
              {dates.data.map((item) => {
                const { periods, id } = item;
                const seconds = (item.date as any).seconds;
                const date = new Date(seconds * MILISECONDS);
                return (
                  <Tr key={id} data-testid={id}>
                    <Td>
                      <Text fontWeight={600}>{date.toLocaleString()}</Text>
                    </Td>
                    <Td>
                      <Text fontWeight={600}>{periods.join(", ")}</Text>
                    </Td>
                    <Td>
                      <HStack>
                        <IconButton
                          onClick={() => handleEdit(item)}
                          variant="ghost"
                          colorScheme={"cyan"}
                          size="lg"
                          aria-label="Editar data"
                          icon={<EditIcon />}
                          data-testid="date-edit-btn"
                        />
                        <IconButton
                          onClick={() => handleDeleteModal(id!)}
                          variant="ghost"
                          colorScheme={"red"}
                          size="lg"
                          aria-label="Deletar data"
                          icon={<DeleteIcon />}
                          data-testid="date-delete-btn"
                        />
                      </HStack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </TableContainer>
      <CalendarModal
        isOpen={isOpen}
        initialValues={modalInputs}
        handleClose={handleClose}
      />
      <AlertModal
        isOpen={isDeleteOpen}
        onClose={clearDelete}
        handleDelete={handleDelete}
        header={<Text>Deletar data</Text>}
        body={<Text>Tem certeza que deseja deletar essa data?</Text>}
      />
    </>
  );
};

export default CalendarTable;
