import { db } from '../firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const COLLECTION = 'operators';

export async function getOperadores() {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addOperador(operador) {
  const { id, ...data } = operador;
  const docRef = await addDoc(collection(db, COLLECTION), data);
  return docRef.id;
}

export async function updateOperador(id, fields) {
  await updateDoc(doc(db, COLLECTION, id), fields);
}

export async function deleteOperador(id) {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function importOperadores(lista) {
  for (const op of lista) {
    const { id, ...data } = op;
    await addDoc(collection(db, COLLECTION), data);
  }
}

export async function resetOperadores(datosIniciales) {
  const snapshot = await getDocs(collection(db, COLLECTION));
  const borrados = snapshot.docs.map((d) => deleteDoc(doc(db, COLLECTION, d.id)));
  await Promise.all(borrados);
  for (const op of datosIniciales) {
    const { id, ...data } = op;
    await addDoc(collection(db, COLLECTION), data);
  }
}
