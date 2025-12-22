import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { useGlobalContext } from "./useGlobalContex";
import toast from "react-hot-toast";

export const useGoogleLogin = () => {
  const { dispatch } = useGlobalContext();

  const provider = new GoogleAuthProvider();

  const googleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      toast.success("Xush kelibsiz 🎉");
      dispatch({ type: "LOGIN", payload: user });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return { googleLogin };
};
