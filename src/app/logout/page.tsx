"use client";
import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContextUser";
function page() {
  const router = useRouter();
  const data = useContext(AuthContext);
  const [isLogout, setIsLogOut] = useState<boolean | string>(false);
  const handleLogout = async () => {
    try {
      if (auth.currentUser) {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          status: false,
        });
      }
      await signOut(auth);
      setIsLogOut(true);
    } catch (error) {
      console.error("Logout error:", error);
      setIsLogOut("error");
    }
  };

  useEffect(() => {
    handleLogout();
    if (isLogout) {
      data?.setUser(null);
      router.push("/");
    }
    if (isLogout === "error") router.push("/Error");
  }, [isLogout]);
  return <></>;
}

export default page;
