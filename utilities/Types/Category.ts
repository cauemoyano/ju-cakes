import { FormikHelpers } from "formik";

export type Category = {
  id?: string;
  name: string;
  image?: string;
  published?: boolean;
};

export interface CategoryFormType {
  initialValues: Category;
  published?: boolean;
  setPublished: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (
    values: Category,
    formikHelpers: FormikHelpers<Category>
  ) => void | Promise<any>;
}
