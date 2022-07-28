import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createDoc,
  deleteDocument,
  getCollection,
  updateDoc,
} from "../services/FirebaseStorageService/FirebaseStorageService";
import useCloudinary from "../services/useCloudinary/useCloudinary";
import useErrorHandler from "../services/useErrorHandler/useErrorHandler";

import { Category } from "../utilities/Types/Category";
import { Product, ProductVariant } from "../utilities/Types/Products";

type ProductsContextType = {
  createOrUpdateProduct: (data: Product, uid?: string) => Promise<void>;
  createOrUpdateCategory: (data: Category, uid?: string) => Promise<void>;
  categories: {
    data: Category[];
    loading: boolean;
  };
  products: {
    data: Product[];
    loading: boolean;
  };
  variants: ProductVariant[];
  updateCategories: () => Promise<void>;
  updateProducts: () => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<Response | undefined>;
  setVariants: Dispatch<SetStateAction<ProductVariant[]>>;
};

const ProductsContext = createContext<ProductsContextType | {}>({});

export const useProducts = () =>
  useContext(ProductsContext as Context<ProductsContextType>);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setError } = useErrorHandler();
  const { uploadFile } = useCloudinary();
  const [products, setProducts] = useState<{
    data: Product[];
    loading: boolean;
  }>({
    data: [],
    loading: true,
  });
  const [categories, setCategories] = useState<{
    data: Category[];
    loading: boolean;
  }>({ data: [], loading: true });
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  useEffect(() => {
    (async () => {
      try {
        await updateProducts();
        await updateCategories();
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  const createOrUpdateProduct = useCallback((data: Product, uid?: string) => {
    if (uid) {
      return updateDoc("products", uid, data);
    }
    return createDoc("products", data);
  }, []);

  const createOrUpdateCategory = useCallback((data: Category, uid?: string) => {
    if (uid) {
      return updateDoc("categories", uid, data);
    }
    return createDoc("categories", data);
  }, []);

  const updateCategories = useCallback(async () => {
    setCategories({ ...categories, loading: true });
    const data = (await getCollection("categories")) as Category[];
    setCategories({ data, loading: false });
  }, []);

  const updateProducts = useCallback(async () => {
    setProducts({ ...products, loading: true });
    const data = (await getCollection("products")) as Product[];
    setProducts({ data, loading: false });
  }, []);

  const deleteCategory = (id: string) => {
    return deleteDocument(id, "categories");
  };
  const deleteProduct = (id: string) => {
    return deleteDocument(id, "products");
  };

  const uploadImage = useCallback(async (file: File) => {
    try {
      const data = await uploadFile(file);
      return data;
    } catch (error) {
      setError(error);
    }
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        variants,
        createOrUpdateProduct,
        createOrUpdateCategory,
        updateCategories,
        updateProducts,
        deleteCategory,
        deleteProduct,
        uploadImage,
        setVariants,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
