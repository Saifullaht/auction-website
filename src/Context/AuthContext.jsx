import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../Utils/Firebase.js"; // Ensure these are correct
import { doc, getDoc } from "firebase/firestore";
import Loader from "../Components/Loader.jsx";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({ isLogin: false });
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const userInfo = (await getDoc(docRef)).data();
          console.log("userInfo=>", userInfo);
          setUser({
            isLogin: true,
            ...userInfo,
          });
        } catch (error) {
          console.error("Error fetching user info:", error);
          setUser({ isLogin: false });
        } finally {
          setLoader(false);
        }
      } else {
        setUser({ isLogin: false });
        setLoader(false);
      }
    });

    return unsubscribe; // Clean up the subscription
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loader ? (
        <div className="flex h-screen justify-center items-center">
          <Loader />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
