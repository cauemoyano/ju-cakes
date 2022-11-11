import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  User as FirebaseUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onIdTokenChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  Context,
  useRef,
} from "react";
import { auth, db } from "../config/firebase";
import { getDocument } from "../services/FirebaseStorageService/FirebaseStorageService";
import useCheckout from "../services/useCheckout/useCheckout";
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
  loading: boolean;
  firebaseUser: FirebaseUser | null;
  relogin: (
    user: FirebaseUser,
    email: string,
    password: string
  ) => Promise<UserCredential>;
  refreshToken: string | null;
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
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const userFirstTimeRef = useRef(false);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      if (user) {
        user
          .getIdTokenResult()
          .then(async (idTokenResult) => {
            setRefreshToken(user.refreshToken);

            const userData = (await getDocument("customers", user.uid)) as {
              name: string;
              phone: string;
              uid: string;
            };
            setUser({
              email: user.email as string,
              admin: !!idTokenResult.claims?.admin,
              ...userData,
            });
            setFirebaseUser(user);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userFirstTimeRef.current) {
      userFirstTimeRef.current = true;
      return;
    }
    setLoading(false);
  }, [user]);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const relogin = async (
    user: FirebaseUser,
    email: string,
    password: string
  ) => {
    const credential = EmailAuthProvider.credential(email, password);
    return reauthenticateWithCredential(user, credential);
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
        loading,
        firebaseUser,
        relogin,
        refreshToken,
      }}
    >
      {loading ? null : children}
    </AuthUserContext.Provider>
  );
};
