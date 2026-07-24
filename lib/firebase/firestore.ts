/**
 * Single import surface for Firestore so server/client share one module graph.
 * Import `doc` / `getDoc` / etc. from here (or keep firebase/firestore — but
 * always pair them with `getFirebaseDb` from the same Firebase app).
 */
export {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

export { getFirebaseDb } from "./client";
