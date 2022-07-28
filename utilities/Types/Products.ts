import { FormikHelpers } from "formik";

export type ProductVariant = {
  name: "20 Unidades" | "30 Unidades" | "50 Unidades";
  price: number;
};

export type Product = {
  id?: string;
  name: string;
  category?: string;
  description?: string;
  ingredients?: string;
  image?: string;
  variants?: ProductVariant[];
  published?: boolean;
};

export interface ProductFormType {
  initialValues: Product;
  published?: boolean;
  setPublished: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (
    values: Product,
    formikHelpers: FormikHelpers<Product>
  ) => void | Promise<any>;
}
