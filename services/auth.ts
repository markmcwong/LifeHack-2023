import { createNewUserRecord } from "./firestore";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "./firebaseConfig";
import store from "../state/store";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export async function login(email: string, password: string) {
  const result = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  store.dispatch({
    type: "LOGIN",
    name: result.user?.displayName,
    uid: result.user?.uid,
  });
}

export async function register(name: string, email: string, password: string) {
  console.log("clicked");
  const result = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  await result.user?.updateProfile({ displayName: name });
  createNewUserRecord(name, email, result.user!.uid);
  store.dispatch({
    type: "LOGIN",
    name: result.user?.displayName,
    uid: result.user?.uid,
    isNewUser: true,
  });
}

export async function logout() {
  console.log("Logging out");
  await firebase.auth().signOut();
  store.dispatch({ type: "LOGOUT" });
}
