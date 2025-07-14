import Header from "@/components/layouts/Landing/Header";
import {
  faFacebook,
  faInstagram,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type Props = {
  params: {
    id: string;
  };
};
async function page({ params }: Props) {
  const { id } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getDoctorId`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );
  const data = await res.json();

  const doctorDetails = [
    { key: "name", label: "Name :" },
    { key: "email", label: "Email :" },
    { key: "specialization", label: "Specialization :" },
    { key: "country_graduation", label: "Graduation country :" },
    { key: "yearsofexperience", label: "Years of experience :" },
    { key: "gender", label: "Gender :" },
    { key: "city", label: "City :" },
    { key: "decs", label: "About :" },
  ];
  return (
    <>
      <div className="shadow-main">
        <Header />
      </div>
      <div className="text-black/80 lg:py-[80px] py-[50px] bg-secondary font-bold text-2xl lg:pl-32 pl-10">
        Doctor Profile
      </div>
      <div className="flex max-xl:flex-col px-5 max-container py-[80px] gap-10">
        <div className="flex flex-col border border-gray-200 rounded-md p-3">
          {data.msg.image_url ? (
            <Image
              alt="user profile"
              src={data.msg.image_url.image_url}
              width={500}
              height={500}
              className="w-full h-auto"
            />
          ) : (
            <FontAwesomeIcon
              className="text-8xl bg-gray-400 text-gray-300 p-10"
              icon={faUser}
            />
          )}

          <div className="flex flex-col gap-2 bg-secondary py-10 px-5 flex-1">
            <div className="text--800 font-bold text-black text-center p-2 rounded-md">
              Dr. {data.msg.name}
            </div>
            <div className="text-blue-800 font-bold flex items-center justify-around mt-3">
              <Link href="">
                <FontAwesomeIcon className="text-2xl" icon={faFacebook} />
              </Link>
              <Link href="">
                <FontAwesomeIcon className="text-2xl" icon={faInstagram} />
              </Link>

              <Link href="">
                <FontAwesomeIcon className="text-2xl" icon={faSquareXTwitter} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 flex-1">
          {doctorDetails.map((item, i) => (
            <div
              className="border p-2 rounded-md flex gap-3 border-gray-200"
              key={i}
            >
              <div className="text-blue-800 font-bold">{item.label}</div>
              <div className="text-gray-500">
                {data.msg[item.key] ?? "No Data Found"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default page;
