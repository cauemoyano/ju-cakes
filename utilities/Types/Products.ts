import { FormikHelpers } from "formik";

export type Product = {
  productName: string;
};

export interface ProductFormType {
  initialValues: Product;
  handleSubmit: (
    values: Product,
    formikHelpers: FormikHelpers<{
      productName: string;
    }>
  ) => void | Promise<any>;
}
