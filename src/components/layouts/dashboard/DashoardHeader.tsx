import Link from "next/link";
import React from "react";

function DashoardHeader({ name }: { name: string }) {
  return (
    <div className="bg-white py-3 flex justify-between items-center px-12 shadow-main">
      <div className="">Welcome, {name}</div>
      <Link
        className="border p-2 px-5 rounded-md bg-blue-400 text-white transition hover:bg-white hover:border-blue-500 hover:text-black"
        href="/logout"
      >
        Logout
      </Link>
    </div>
  );
}

export default DashoardHeader;
