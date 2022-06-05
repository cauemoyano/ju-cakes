import * as Yup from "yup";
import { phoneRegExp } from "../../components/primitives/PhoneInput";

export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Nome inválido")
    .max(50, "Nome muito longo")
    .required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Insira seu email"),
  phone: Yup.string()
    .matches(phoneRegExp, "Telefone inválido")
    .required("Telefone é obrigatório"),
  password: Yup.string()
    .min(8, "Senha deve conter no mínimo 8 characteres")
    .required("Insira sua senha"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Senhas devem ser iguais"
  ),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Insira seu email"),
  senha: Yup.string().required("Insira sua senha"),
});