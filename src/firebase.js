import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyDVIQUvlNFCkBrEGOje2foc5cP6bJlIXJY",
	authDomain: "todo-app-react-firebase-ba19d.firebaseapp.com",
	projectId: "todo-app-react-firebase-ba19d",
	storageBucket: "todo-app-react-firebase-ba19d.appspot.com",
	messagingSenderId: "579750924659",
	appId: "1:579750924659:web:fa80def4f4230f54be3506",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
