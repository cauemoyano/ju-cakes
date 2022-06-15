import {
  Context,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useCloudinary from "../services/useCloudinary/useCloudinary";
import useErrorHandler from "../services/useErrorHandler/useErrorHandler";
import { useFirebaseStorage } from "../services/useFirebaseStorage/useFirebaseStorage";
import { Category } from "../utilities/Types/Category";
import { Product } from "../utilities/Types/Products";

type ProductsContextType = {
  createOrUpdateProduct: (data: Product, uid?: string) => Promise<void>;
  createOrUpdateCategory: (data: Category, uid?: string) => Promise<void>;
  categories: Category[];
  products: Product[];
  updateCategories: () => Promise<void>;
  updateProducts: () => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<Response | undefined>;
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
  const { uploadFile } = useCloudinary();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

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
    const categories = (await getCollection("categories")) as Category[];
    setCategories(categories);
  }, []);

  const updateProducts = useCallback(async () => {
    const products = (await getCollection("products")) as Product[];
    setProducts(products);
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
      return data.json();
    } catch (error) {
      setError(error);
    }
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        createOrUpdateProduct,
        createOrUpdateCategory,
        updateCategories,
        updateProducts,
        deleteCategory,
        deleteProduct,
        uploadImage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
