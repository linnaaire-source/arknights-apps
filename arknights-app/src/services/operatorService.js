import { db } from "./firebase.js";
import { collection, getDocs, addDoc, writeBatch, doc } from "firebase/firestore";

const COL = "operators";

export async function getOperators() {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addOperator(operator) {
  return await addDoc(collection(db, COL), operator);
}

export async function importOperators(list) {
  const batch = writeBatch(db);
  list.forEach(op => {
    const ref = doc(collection(db, COL));
    batch.set(ref, op);
  });
  await batch.commit();
}