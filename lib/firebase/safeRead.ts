import type {
  DocumentReference,
  DocumentSnapshot,
  Query,
  QuerySnapshot,
} from "firebase/firestore";
import { getDoc, getDocs } from "firebase/firestore";

function isOfflineError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return /offline|Backend didn't respond|Could not reach Cloud Firestore/i.test(
    message
  );
}

async function withFirestoreRetry<T>(run: () => Promise<T>): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await run();
    } catch (error) {
      lastError = error;
      if (!isOfflineError(error) || attempt === 2) throw error;
      await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
    }
  }
  throw lastError;
}

/** getDoc with short retries for transient Next.js / web-SDK offline errors. */
export function getDocSafe(
  ref: DocumentReference
): Promise<DocumentSnapshot> {
  return withFirestoreRetry(() => getDoc(ref));
}

/** getDocs with short retries for transient Next.js / web-SDK offline errors. */
export function getDocsSafe(query: Query): Promise<QuerySnapshot> {
  return withFirestoreRetry(() => getDocs(query));
}
