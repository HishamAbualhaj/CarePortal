"use client";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createContext } from "react";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import useFetch from "@/hooks/useFetch";
import { baseURL } from "@/helpers/getApiUrl";
interface Props {
  children: React.ReactNode;
}
export type UserProfile = {
  uid: string;
  image_url: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  date: string;
  status: string;
  role: string;
  token?: string;
};
export type AuthContextType = {
  user: UserProfile | null;
  setUser: Dispatch<SetStateAction<UserProfile | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
function AuthContextUser({ children }: Props) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const authChange = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await auth.currentUser?.getIdToken();
        const userData = await useFetch(`${baseURL}/api/setToken`, "POST", {
          token,
          type: "set",
        });
        if (typeof userData.msg !== "string") {
          const newUser = { uid: user?.uid, ...userData.msg, token };
          setUser(newUser as UserProfile);
        }

        setLoading(false);
        return;
      }
      setLoading(false);
    });

    return () => authChange();
  }, []);
  if (loading) {
    return (
      <>
        <div className="h-screen flex items-center justify-center text-4xl ">
          <div className="flex animate-pulse gap-1 font-bold md:text-4xl text-xl">
            <div className="text-blue-500">Care</div>
            <div className="text-black">Portal</div>
          </div>
        </div>
      </>
    );
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextUser;
