import { Input } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import InputMask from "react-input-mask";

export const phoneRegExp = /^(\([1-9]{2}\))\s([1-9][0-9]{3,4})-([0-9]{4})$/;

const ajusta = (v: string) => {
  const digitos = !v ? "" : v.replace(/[^\d]/g, "");
  if (!digitos || digitos.length < 10) return v;
  const corte = digitos.length === 10 ? 6 : 7;
  const max = digitos.length > 11 ? 11 : digitos.length;
  return `(${digitos.substring(0, 2)}) ${digitos.substring(
    2,
    corte
  )}-${digitos.substring(corte, max)}`;
};

const maskBuilder = (v: string) => {
  if (!v || v.length == 0) return "";
  const a = ajusta(v);
  return a.length >= 6 && a[5] === "9" ? "(99) 99999-9999" : "(99) 9999-9999";
};

type Props = {
  value: string;
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  id?: string;
  name?: string;
};

const PhoneInput = ({
  value,
  handleChange,
  id = "phone",
  name = "phone",
}: Props) => {
  return (
    <Input
      as={InputMask}
      mask={maskBuilder(value)}
      name={name}
      id={id}
      type="phone"
      value={value}
      onChange={handleChange}
    />
  );
};

export default PhoneInput;
