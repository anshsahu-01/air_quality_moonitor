"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { buildDashboardSnapshot } from "@/lib/air-quality";

export function getPublicFirebaseConfig() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  return Object.values(config).every(Boolean) ? config : null;
}

function getFirebaseDb() {
  const config = getPublicFirebaseConfig();
  if (!config) return null;

  const app = getApps().length ? getApp() : initializeApp(config);
  return getFirestore(app);
}

export function subscribeToFirebaseNodes(onData) {
  const db = getFirebaseDb();
  if (!db) return null;

  return onSnapshot(collection(db, "air-quality-nodes"), (snapshot) => {
    const nodes = snapshot.docs.map((doc) => doc.data());
    onData(buildDashboardSnapshot(nodes));
  });
}
