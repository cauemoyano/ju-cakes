import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useState, useEffect, Context } from "react";
import { auth, db } from "../config/firebase";
import { User } from "../utilities/Types/Auth";

type ContextProps = {
  user: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  setUserData: (
    uid: string,
    data: {
      phone: string;
      newsAndOffers: boolean;
      name: string;
    }
  ) => Promise<void>;
  sendPassRecoveryEmail: (email: string) => Promise<void>;
};

const AuthUserContext = createContext<ContextProps | {}>({});

export const useAuth = () =>
  useContext(AuthUserContext as Context<ContextProps>);

export const AuthUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user
          .getIdTokenResult()
          .then((idTokenResult) => {
            setUser({
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              admin: !!idTokenResult.claims?.admin,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const setUserData = (
    uid: string,
    data: { phone: string; newsAndOffers: boolean; name: string }
  ) => {
    const { phone, newsAndOffers, name } = data;
    return setDoc(doc(db, "customers", uid), {
      phone,
      newsAndOffers,
      name,
    });
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  const sendPassRecoveryEmail = async (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthUserContext.Provider
      value={{
        user,
        signup,
        logout,
        login,
        setUserData,
        sendPassRecoveryEmail,
      }}
    >
      {loading ? null : children}
    </AuthUserContext.Provider>
  );
};
