import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const useLogout = () => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User logged out");
      })
      .catch((error) => {
        // An error happened.
        console.error("Logout error:", error);
      });
  };

  return { logout };
};
