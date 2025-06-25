"use client";
import Button from "@/components/ui/Button";
import useFetch from "@/hooks/useFetch";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function page() {
  const inputs = [
    { id: "email", text: "Email", type: "text", warning: null },
    { id: "password", text: "Password", type: "password", warning: null },
  ];
  const [userData, setUserData] = useState<Record<string, any>>({
    email: "",
    password: null,
  });
  const { mutate, data, isPending } = useMutation({
    mutationKey: ["authUser"],
    mutationFn: async () => {
      return await useFetch("/api/authUser", "POST", userData);
    },
  });

  const hanldeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <>
      <div className="flex h-screen ems-center">
        <div className="flex-1 bg-blue-100 flex justify-center items-center relative max-xl:hidden">
          <div className="text-2xl bg-white p-5 max-w-[550px] rounded-md leading-[35px] shadow-main">
            " Its important to take care of your
            <span className="text-blue-500"> health</span> even if you seem
            healty "
          </div>
        </div>
        <div className="flex justify-center items-center flex-1 px-5">
          <div className="">
            <div className="border border-gray-200 shadow-main rounded-md xl:p-10 p-7 mt-5">
              <div className="font-bold text-2xl">Sign In</div>
              <div className="text-black/80 mt-1 text-[16px]">
                Please enter the following data so you can login to your account
                and start your medical journey with us today
              </div>
              <div className="flex flex-col gap-2 mt-3">
                {inputs.map((input, i) => (
                  <div key={i} className="flex flex-col gap-1 relative">
                    <div className="text-black/80 text-[16px]">
                      {input.text}
                    </div>
                    <input
                      id={input.id}
                      onChange={hanldeChange}
                      type={input.type}
                    />
                    {input.warning && (
                      <div className="text-red-500 text-sm absolute -bottom-5 left-0">
                        {input.warning}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Link
                className="text-black/80 mt-3 block text-[15px]"
                href="/forgotpassword"
              >
                Forgot your password ?
              </Link>

              <div className="mt-3">
                {isPending ? (
                  <Button text="Loading" />
                ) : (
                  <Button onClick={mutate} text="Login" />
                )}
              </div>
              <div className="mt-3 flex gap-3 text-black/80 text-[16px]">
                Don't you have an account?
                <Link className="font-bold" href="/register">
                  Register here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
