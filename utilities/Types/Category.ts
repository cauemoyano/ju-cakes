import { FormikHelpers } from "formik";

export type Category = {
  id?: string;
  name: string;
};

export interface CategoryFormType {
  initialValues: Category;
  handleSubmit: (
    values: Category,
    formikHelpers: FormikHelpers<{
      name: string;
    }>
  ) => void | Promise<any>;
}
