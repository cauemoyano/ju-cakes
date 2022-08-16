import * as Yup from "yup";
import { phoneRegExp } from "../../components/primitives/PhoneInput";

export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Nome inválido")
    .max(50, "Nome muito longo")
    .required("Nome é obrigatório"),
  emailRegister: Yup.string()
    .email("Email inválido")
    .required("Insira seu email"),
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

export const PassRecoverySchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Insira seu email"),
});

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  category: Yup.string().required("Categoria é obrigatório"),
  description: Yup.string().required("Descrição é obrigatório"),
  ingredients: Yup.string().required("Ingredientes é obrigatório"),
  variants: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Nome é obrigatório"),
        price: Yup.number()
          .required("Preço obrigatório")
          .min(0, "Preço deve ser positivo"),
      })
    )
    .min(1, "Variante é obrigatório"),
});
export const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
});
/* export const VariantSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  price: Yup.number()
    .required("Preço obrigatório")
    .min(0, "Preço deve ser positivo"),
}); */
