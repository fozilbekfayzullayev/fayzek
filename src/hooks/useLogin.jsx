import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useGlobalContext } from "./useGlobalContex";

// VALIDATION TOAST
import toast from "react-hot-toast";
import { firebaseAuthErrors } from "../validation/firebaseError";
import { useState } from "react";

export const useLogin = () => {
  const { dispatch } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch({ type: "LOGIN", payload: user });
      toast.success("Xush kelibsiz 🎉");
    } catch (error) {
      const errorMessage =
        firebaseAuthErrors[error.code] || "No'malum xato yuz berdi";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
