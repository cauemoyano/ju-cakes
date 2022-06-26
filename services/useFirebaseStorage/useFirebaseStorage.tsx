import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../../config/firebase";

export const useFirebaseStorage = () => {
  const updateDoc = useCallback(
    (collectionName: string, id: string, data: { [key: string]: any }) => {
      setDoc(doc(db, collectionName, id), data);
    },
    []
  );
  const createDoc = useCallback(
    (collectionName: string, data: { [key: string]: any }) => {
      addDoc(collection(db, collectionName), data);
    },
    []
  );
  const getCollection = useCallback(async (collectionName: string) => {
    const snapshot = await getDocs(collection(db, collectionName));
    const documents = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return documents;
  }, []);
  const deleteDocument = useCallback((id: string, collectionName: string) => {
    return deleteDoc(doc(db, collectionName, id));
  }, []);

  return { updateDoc, createDoc, getCollection, deleteDocument };
};
