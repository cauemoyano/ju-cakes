import { collection, doc, getDocs, query } from "firebase/firestore";
import { Context, createContext, useContext, useEffect, useState } from "react";
import { db } from "../../config/firebase";
import useErrorHandler from "../../services/useErrorHandler/useErrorHandler";

export type CustomerContextType = {
  customers: any[];
  loading: boolean;
};

const CustomerContext = createContext<CustomerContextType | {}>({});

export const useCustomer = () =>
  useContext(CustomerContext as Context<CustomerContextType>);

const CustomerProvider = ({ children }: { children: React.ReactNode }) => {
  const [customers, setCustomers] = useState<{ [x: string]: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const { setError } = useErrorHandler();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const customers = await getCustomers();
        setCustomers(customers);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getCustomers = async () => {
    const snapshot = await getDocs(collection(db, "customers"));
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };

  return (
    <CustomerContext.Provider value={{ customers, loading, getCustomers }}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
