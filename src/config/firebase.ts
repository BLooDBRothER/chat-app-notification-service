import admin, { ServiceAccount } from "firebase-admin";
import firebaseServiceKey from "../firebase.json";

const initializeFirebase = () => {
    const firebaseAdminConfig = {
        credential: admin.credential.cert(firebaseServiceKey as ServiceAccount),
        firestore: process.env.DATABASE_URL,
    };

    admin.initializeApp(firebaseAdminConfig);
};

export default initializeFirebase;
