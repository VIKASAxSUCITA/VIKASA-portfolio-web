import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  type Firestore,
} from "firebase/firestore";
import { getFirebaseClientConfig } from "./config";

const SERVER_APP_NAME = "vikasa-server";

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

/**
 * Browser: default Firestore.
 * Server (RSC / Node): dedicated app + long polling to avoid the common
 * "Failed to get document because the client is offline" failure with the
 * web SDK in Next.js server components.
 */
export function getFirebaseDb(): Firestore {
  if (typeof window === "undefined") {
    const existing = getApps().find((app) => app.name === SERVER_APP_NAME);
    const app =
      existing ?? initializeApp(getFirebaseClientConfig(), SERVER_APP_NAME);
    try {
      return initializeFirestore(app, {
        experimentalForceLongPolling: true,
      });
    } catch {
      return getFirestore(app);
    }
  }

  return getFirestore(getFirebaseApp());
}
