import {
  Button,
  Heading,
  HStack,
  UseDisclosureProps,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useCalendar from "../../../services/useCalendar/useCalendar";
import useErrorHandler from "../../../services/useErrorHandler/useErrorHandler";
import { CalendarItem } from "../../../utilities/Types/Calendar";
import SimpleModal from "../../layout/modal/SimpleModal";
import CalendarBuilder from "./CalendarBuilder";

type Props = {
  initialValues: CalendarItem;
  handleClose: () => void;
};

const CalendarModal = ({
  isOpen,
  initialValues,
  handleClose,
}: Props & Required<Pick<UseDisclosureProps, "isOpen">>) => {
  const { createOrUpdateCalendarItem, updateCalendar } = useCalendar();
  const toast = useToast();
  const { setError, errorToast } = useErrorHandler();
  const [date, setDate] = useState<Date | null>(null);
  const [periods, setPeriods] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!initialValues.date) return;
    setDate(initialValues.date);
    setPeriods(initialValues.periods);
  }, [initialValues]);

  const handleSubmit = async () => {
    if (!date) return;
    setLoading(true);
    try {
      await createOrUpdateCalendarItem({ date, periods }, initialValues?.id);
      await updateCalendar();
      toast({
        title: "Data salva.",
        description: "A data foi salva com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      handleClose();
      setDate(null);
      setPeriods([]);
    } catch (err: any) {
      setError(err);
      errorToast(err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SimpleModal
      onClose={handleClose}
      isOpen={isOpen}
      header={<Heading fontFamily="inter">Adicionar/Editar Data</Heading>}
      footer={
        <HStack spacing={4}>
          <Button
            isLoading={loading}
            loadingText="Submitting"
            colorScheme="primaryNumbered"
            variant="solid"
            onClick={handleSubmit}
          >
            Salvar
          </Button>
          <Button
            colorScheme="primaryNumbered"
            variant="outline"
            mr={3}
            onClick={handleClose}
          >
            Fechar
          </Button>
        </HStack>
      }
    >
      <CalendarBuilder
        date={date}
        setDate={setDate}
        periods={periods}
        setPeriods={setPeriods}
      />
    </SimpleModal>
  );
};

export default CalendarModal;
