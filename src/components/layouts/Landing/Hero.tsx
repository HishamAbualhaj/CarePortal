import Link from "next/link";
import React from "react";
import ImageFallBack from "@/components/ui/ImageFallBack";

function Hero() {
  const buttons = [
    {
      key: 1,
      text: "Book an Appointment",
      link: "/appointment",
      bgColor: "bg-blue-900",
      textColor: "text-white",
    },
    {
      key: 2,
      text: "Our Latest News",
      link: "/news",
      bgColor: "bg-blue-300",
      textColor: "text-black",
    },
    {
      key: 3,
      text: "Free Medical Examination",
      link: "/",
      bgColor: "bg-cyan-500",
      textColor: "text-white",
    },
  ];

  return (
    <>
      <div className="max-w-[992px] mx-auto relative px-5">
        <div className="py-[100px]">
          <div className="flex justify-between xl:flex-row flex-col max-xl:gap-5">
            <div className="flex flex-col gap-5">
              <div>
                <div className="text-cyan-500 uppercase text-xl">
                  caring for life
                </div>
                <div className="text-[40px] max-w-[400px] text-blue-900 font-bold">
                  Leading the Way in Medical Excellence
                </div>
              </div>

              <Link
                className="block bg-blue-100 w-fit px-8 py-2 rounded-full cursor-pointer"
                href="/appointment"
              >
                Appointment
              </Link>
            </div>
            <ImageFallBack w="500px" />
          </div>
        </div>
        <div className="flex lg:translate-y-1/2 lg:gap-10 gap-5 lg:flex-row flex-col px-5 justify-center">
          {buttons.map((btn) => (
            <Link
              href={btn.link}
              className={`${btn.bgColor} ${btn.textColor} xl:py-8 py-4 px-5 flex-1 rounded-md`}
              key={btn.key}
            >
              {btn.text}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Hero;
