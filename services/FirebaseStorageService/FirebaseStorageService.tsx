import { updateEmail, User as FirebaseUser } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../../config/firebase";
import { User } from "../../utilities/Types/Auth";

export const updateUserEmail = (user: FirebaseUser, newEmail: string) => {
  return updateEmail(user, newEmail);
};

export const updateDoc = (
  collectionName: string,
  id: string,
  data: { [key: string]: any }
) => {
  return setDoc(doc(db, collectionName, id), data);
};
export const createDoc = (
  collectionName: string,
  data: { [key: string]: any }
) => {
  return addDoc(collection(db, collectionName), data);
};
export const getCollection = async (collectionName: string) => {
  const snapshot = await getDocs(collection(db, collectionName));
  const documents = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return documents;
};
export const deleteDocument = (id: string, collectionName: string) => {
  return deleteDoc(doc(db, collectionName, id));
};
export const getDocument = async (collectionName: string, id: string) => {
  const snap = await getDoc(doc(db, collectionName, id));
  return { ...snap.data(), uid: snap.id };
};

export const getDocsByQuery = async (
  collectionName: string,
  field: string,
  value: string
) => {
  const q = query(collection(db, collectionName), where(field, "==", value));
  const snapshot = await getDocs(q);
  const documents = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return documents;
};
