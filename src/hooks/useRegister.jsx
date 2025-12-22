import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useGlobalContext } from "./useGlobalContex";

// VALIDATION TOAST
import toast from "react-hot-toast";
import { firebaseAuthErrors } from "../validation/firebaseError";
import { useState } from "react";

export const useRegister = () => {
  const { dispatch } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const register = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz 🎉");
      dispatch({ type: "LOGIN", payload: user });
    } catch (error) {
      const errorMessage =
        firebaseAuthErrors[error.code] || "No'malum xato yuz berdi";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};
