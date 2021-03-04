import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import { UserType } from "./model/Users";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

interface AdditionalUserData {
  name: string,
  type: UserType, 
};

// If we don't declare it locally, we get an unitialized firebase error (ONLY IN THIS FILE)
const UsersCollection = firestore.collection('users');

export const generateUserDocument = async (user: any, additionalData?: AdditionalUserData) => {
  if (!user) return;
  const userRef = UsersCollection.doc(user.uid);
  const snapshot = await userRef.get();
  // TODO(important): Feels unsafe imo, move it to backend, and change security rules to not allow writes firestore
  //                  only reads. Or find way to amke it strict af.
  if (!snapshot.exists && additionalData) {
    const { email } = user;
    const { name, type } = additionalData;
    try {
      await userRef.set({
        email,
        name,
        type: type.type,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid: string) => {
  if (!uid) return null;
  try {
    const userDocument = await UsersCollection.doc(uid).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
