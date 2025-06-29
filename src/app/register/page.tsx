"use client";
import Button from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { createDataDoc } from "@/firebase/db";
import { FirebaseError } from "firebase/app";
import Modal from "@/components/ui/Modal";
import { useRouter } from "next/navigation";
function page() {
  const router = useRouter();
  const [inputs, setInputs] = useState<Record<string, any>[]>([
    { id: "name", text: "Full Name", type: "text", warning: null },
    { id: "email", text: "Email", type: "text", warning: null },
    { id: "mobile", text: "Phone number", type: "text", warning: null },
    { id: "date", text: "Date of birth", type: "date", warning: null },
    { id: "gender", text: "Gender", type: "select", warning: null },
    {
      id: "password",
      text: "Password",
      type: "password",
      warning: "",
    },
    {
      id: "confirmpass",
      text: "Confirm password",
      type: "password",
      warning: "",
    },
    { id: "address", text: "Address", type: "text", warning: null },
  ]);
  const [userData, setUserData] = useState<Record<string, any>>({
    name: "",
    email: "",
    mobile: "",
    date: "",
    image_url: "",
    gender: "",
    password: null,
    confirmpass: null,
    address: "",
    status: true,
    isVerified: false,
  });

  const signup = async () => {
    try {
      const { password, confirmpass, ...cleanedUserData } = userData;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const id = await createDataDoc({
        data: cleanedUserData,
        docName: "users",
        id: userCredential.user.uid,
      });

      return { message: "Signup successfully", status: true };
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error);
        if (error.code === "auth/email-already-in-use") {
          return { message: "Email is already in use", status: false };
        } else if (error.code === "auth/weak-password") {
          return {
            message: "Password must be at least 6 character ",
            status: false,
          };
        }
        return { message: "Faild to sign up", status: false };
      }
    }
  };
  const { mutate, data, isPending } = useMutation({
    mutationKey: ["addUser"],
    mutationFn: signup,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, tabIndex } = e.target;

    const currentInput = inputs[tabIndex];

    const newInputs = inputs.map((input) => {
      if (input === currentInput && id !== "password" && id !== "confirmpass") {
        input = {
          ...input,
          warning: value === "" ? "This Field is required" : null,
        };
      }
      return input;
    });

    setInputs(newInputs);

    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const passwordMismatch =
      userData.password &&
      userData.confirmpass &&
      userData.password !== userData.confirmpass;

    const newInputs = inputs.map((input) => {
      if (input.id === "confirmpass" || input.id === "password") {
        let newWarning = null;
        if (passwordMismatch) {
          newWarning = "Passwords do not match";
        } else {
          newWarning =
            userData[input.id] === "" ? "This Field is required" : null;
        }

        if (input.warning !== newWarning) {
          return { ...input, warning: newWarning };
        }
      }
      return input;
    });

    setInputs(newInputs);
  }, [userData.password, userData.confirmpass]);

  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setModal(true);
      {
        data.status && router.push("/");
      }
    }
  }, [data]);
  return (
    <>
      <div className="flex h-screen ems-center">
        <div className="flex-1 bg-blue-100 flex justify-center items-center relative max-xl:hidden">
          <div className="text-2xl bg-white p-5 max-w-[550px] rounded-md leading-[35px] shadow-main">
            " Its important to take care of your
            <span className="text-blue-500">health</span> even if you seem
            healty "
          </div>
        </div>
        <div className="flex justify-center items-center flex-1 px-5">
          <div className="">
            <div className="border border-gray-200 shadow-main rounded-md xl:p-10 p-7 mt-5">
              <div className="font-bold text-2xl">Create account</div>
              <div className="text-black/80 mt-1 text-[16px]">
                Please enter the following data so you can create new account
                and start your medical journey with us today
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-3">
                {inputs.map((input, i) => (
                  <div key={i} className="flex flex-col gap-1 relative">
                    <div className="text-black/80 text-[16px]">
                      {input.text}
                    </div>
                    {input.type === "select" ? (
                      <select name="" id="">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    ) : (
                      <input
                        style={{
                          border: `${input.warning ? "1px solid red" : ""} `,
                        }}
                        tabIndex={i}
                        id={input.id}
                        onChange={handleChange}
                        type={input.type}
                      />
                    )}

                    {input.warning && (
                      <div className="text-red-500 text-sm absolute -bottom-5 left-0">
                        {input.warning}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-3">
                {isPending ? (
                  <Button text="Loading" />
                ) : (
                  <Button onClick={mutate} text="Create account" />
                )}
              </div>
              <div className="mt-3 flex gap-3 text-black/80 text-[16px]">
                Already Register ?
                <Link className="font-bold" href="/login">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <Modal text={data?.message} status={data?.status} setModel={setModal} />
      )}
    </>
  );
}

export default page;
