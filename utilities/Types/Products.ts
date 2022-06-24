import { FormikHelpers } from "formik";

export type ProductVariant = "20 Unidades" | "30 Unidades" | "50 Unidades";

export type Product = {
  id?: string;
  name: string;
  category?: string;
  description?: string;
  ingredients?: string;
  price?: number;
  image?: string;
  variant?: ProductVariant;
};

export interface ProductFormType {
  initialValues: Product;
  handleSubmit: (
    values: Product,
    formikHelpers: FormikHelpers<Product>
  ) => void | Promise<any>;
}
