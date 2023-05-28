import { createNewUserRecord } from "./firestore";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "./firebaseConfig";
import store from "../state/store";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export async function login(email: string, password: string) {
  try {
    const result = await firebase.auth().signInWithEmailAndPassword(email, password);
    store.dispatch({
      type: "LOGIN",
      name: result.user?.displayName,
      uid: result.user?.uid,
    });
  } catch (error) {
    throw new Error("Invalid username or password."); // Throw an error for invalid login details
  }
}

export async function register(name: string, email: string, password: string) {
  try {
    console.log("clicked");
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await result.user?.updateProfile({ displayName: name });
    createNewUserRecord(name, email, result.user!.uid);
    store.dispatch({
      type: "LOGIN",
      name: result.user?.displayName,
      uid: result.user?.uid,
      isNewUser: true,
    });
  } catch (error) {
    throw new Error("Registration failed. Please try again."); // Throw an error for registration failure
  }
}

export async function logout() {
  try {
    console.log("Logging out");
    await firebase.auth().signOut();
    store.dispatch({ type: "LOGOUT" });
  } catch (error) {
    console.error("Logout error:", error);
  }
}
