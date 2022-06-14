import {
  Context,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useErrorHandler from "../services/useErrorHandler/useErrorHandler";
import { useFirebaseStorage } from "../services/useFirebaseStorage/useFirebaseStorage";
import { Category } from "../utilities/Types/Category";
import { Product } from "../utilities/Types/Products";

type ProductsContextType = {
  products: { productName: string };
  createOrUpdateProduct: (data: Product, uid?: string) => Promise<void>;
  createOrUpdateCategory: (data: Category, uid?: string) => Promise<void>;
  categories: Category[];
  updateCategories: () => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
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
  const { updateDoc, createDoc, getCollection, deleteDocument } =
    useFirebaseStorage();
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      try {
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
    const categories = (await getCollection("categories")) as Category[];
    setCategories(categories);
  }, []);

  const deleteCategory = (id: string) => {
    return deleteDocument(id, "categories");
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        createOrUpdateProduct,
        createOrUpdateCategory,
        categories,
        updateCategories,
        deleteCategory,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
