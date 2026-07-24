import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getFirebaseClientConfig } from "./config";

/**
 * Always resolve through the current Firebase app.
 * Avoid caching Auth/Firestore instances across Next.js HMR — a stale instance
 * from a previous module evaluation fails Firestore's `instanceof` checks and
 * throws: "Expected first argument to doc() to be a CollectionReference..."
 */
export function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(getFirebaseClientConfig());
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}

export function getFirebaseDb(): Firestore {
  return getFirestore(getFirebaseApp());
}
