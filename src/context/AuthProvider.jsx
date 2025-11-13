import React, { useEffect } from "react";
import AuthContext from "./AuthContext";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const axiosSecure = useAxiosSecure();

  const [movies, setMovies] = useState([]);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const loggedUser = {
          email: currentUser.email,
          displayName: currentUser.displayName,
        };

        axiosSecure.post("/users-create", loggedUser).then(() => {
          // console.log(data.data)
        });
      }
    });
    return () => unsubscribe();
  }, [axiosSecure]);

  // all movies get
  useEffect(() => {
    axiosSecure.get("/movies").then((data) => {
      setMovies(data.data);
    });
  }, [axiosSecure]);

  

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const authInfo = {
    user,
    movies,
  
    createUser,
    signInUser,
    loginGoogle,
    updateUser,
    signOutUser,
    isDarkMode,
    toggleTheme,
    showMobileMenu,
    setShowMobileMenu,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
