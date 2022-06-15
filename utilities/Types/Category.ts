import { FormikHelpers } from "formik";

export type Category = {
  id?: string;
  name: string;
  image?: string;
};

export interface CategoryFormType {
  initialValues: Category;
  handleSubmit: (
    values: Category,
    formikHelpers: FormikHelpers<Category>
  ) => void | Promise<any>;
}
