"use client";
import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContextUser";
import useFetch from "@/hooks/useFetch";
function page() {
  const router = useRouter();
  const data = useContext(AuthContext);
  const [isLogout, setIsLogOut] = useState<boolean | string>(false);
  const handleLogout = async () => {
    try {
      if (data?.user?.token) {
        await useFetch("/api/setToken", "POST", {
          token: data?.user?.token,
          type: "unset",
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
