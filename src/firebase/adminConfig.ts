import admin from "firebase-admin";
const privateKey = process.env.FIREBASE_ADMIN_KEY?.replace(/\\n/g, "\n");

const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey,
      clientEmail,
      projectId,
    }),
  });
}

const adminDB = admin.firestore();
const adminAuth = admin.auth();

export { adminDB, adminAuth };
