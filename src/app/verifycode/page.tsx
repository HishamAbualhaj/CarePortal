import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div className="h-screen bg-secondary flex justify-center items-center px-5">
      <div className="flex flex-col bg-white shadow-main max-w-[500px] text-black/70 p-5 rounded-md">
        <div className="text-lg">
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? if you
          didn't receive the email, we will gladly send you another.
        </div>
        <div className="flex justify-between mt-5 items-center">
          <div className="p-3 bg-gray-700 cursor-pointer text-white rounded-md text-[15px] font-bold">RESEND VERIFICATION EMAIL</div>
          <Link className="underline" href="/logout">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
