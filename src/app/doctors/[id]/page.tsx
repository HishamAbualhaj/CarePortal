import Footer from "@/components/layouts/Landing/Footer";
import Header from "@/components/layouts/Landing/Header";
import Button from "@/components/ui/Button";
import {
  faFacebook,
  faInstagram,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <>
      <div className="shadow-main">
        <Header />
      </div>
      <div className="flex max-xl:flex-col px-5 max-container py-[80px] gap-10">
        <div className="flex flex-col border border-gray-200 rounded-md p-3">
          <FontAwesomeIcon
            className="text-8xl bg-gray-400 text-gray-300 p-10"
            icon={faUser}
          />
          <div className="flex flex-col gap-2 bg-secondary py-10 px-5">
            <div className="text--800 font-bold text-white text-center bg-blue-500 p-2 rounded-md">
              Hisham Abualhaj
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

        <div className="flex flex-col gap-5">
          <div>
            <div className="text-blue-800 font-bold">Dr. Hisham Abualhaj</div>
            <div className="text-gray-500">General Surgery</div>
          </div>
          <div>
            <div className="text-blue-800 font-bold">Graduation country</div>
            <div className="text-gray-500">Palestine</div>
          </div>
          <div>
            <div className="text-blue-800 font-bold">About</div>
            <div className="text-gray-500 max-w-[500px]">
              Dr. Lina Hasan is a board-certified cardiologist known for her
              patient-centered care and advanced expertise in treating heart
              conditions. She is passionate about preventive medicine and
              improving cardiovascular health through modern diagnostics and
              compassionate treatment.
            </div>
          </div>
          <div className="flex justify-between items-center gap-3">
            <div className="text-blue-800 font-bold">CV:</div>
            <div className="flex flex-1 gap-3">
              <Link className="flex-1" href="">
                <Button text="Preview" />
              </Link>
              <Link className="flex-1" href="">
                <Button text="Download" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-500 py-[30px]">
        <Footer />
      </div>
    </>
  );
}

export default page;
