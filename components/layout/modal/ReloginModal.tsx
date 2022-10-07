import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import useErrorHandler, {
  firebaseErrorMap,
} from "../../../services/useErrorHandler/useErrorHandler";
import LoginComponent from "../auth/LoginComponent";
import LoginForm from "../auth/LoginForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleAfterLogin: () => Promise<void>;
};

const ReloginModal = (props: Props) => {
  const { isOpen, onClose, handleAfterLogin } = props;
  const { relogin, firebaseUser } = useAuth();
  const { setError } = useErrorHandler();

  const handleSubmit = async (
    values: { email: string; senha: string },
    actions: FormikHelpers<{
      email: string;
      senha: string;
    }>
  ) => {
    if (!firebaseUser) return;
    try {
      await relogin(firebaseUser, values.email, values.senha);
    } catch (error: any) {
      if (error.code === "auth/wrong-password") {
        actions.setFieldError("senha", "Senha incorreta");
      }
      setError(error);
    } finally {
      actions.setSubmitting(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <Text mb={4}>Favor insira sua senha</Text>
          <LoginForm handleSubmit={handleSubmit} relogin={true} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReloginModal;
