import React from "react";
import Title from "../../ui/Title";
import Link from "next/link";
import ImageFallBack from "@/components/ui/ImageFallBack";

function OurOffer() {
  const services = [
    { key: 1, text: "Surgery", icon: null, link: "/" },
    { key: 2, text: "Internal medicine", icon: null, link: "/" },
    { key: 3, text: "Bones", icon: null, link: "/" },
    { key: 4, text: "Blood Bank", icon: null, link: "/" },
  ];
  return (
    <>
      <div className="max-w-[992px] mx-auto px-5 py-[80px] text-center">
        <Title title="Care you can believe in" subtitle="Our Offer" />
        <div className="mt-10 flex gap-5 max-xl:flex-col xl:items-start items-center justify-between">
          <div className="border border-blue-900 rounded-md flex flex-col justify-between">
            <div className="flex flex-1 flex-col p-1 justify-between">
              {services.map((service) => (
                <div
                  key={service.key}
                  className="flex flex-col gap-2border-b border-gray-300 hover:bg-gray-100"
                >
                  <Link className=" py-10 px-4" href={service.link}>
                    {service.icon}
                    {service.text}
                  </Link>
                </div>
              ))}
            </div>
            <div className="bg-blue-900 text-white flex">
              <Link className="py-2 flex-1" href="/">
                View All
              </Link>
            </div>
          </div>
          {/* service component  */}
          <div className="mt-5">
            <div className="font-bold text-2xl text-start">
              A passion for putting patients first.
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col gap-2 mt-5">
                {["A passion for Healing", "5-Star Care", "All our best"].map(
                  (txt) => (
                    <div key={txt} className="flex gap-2 text-lg items-center">
                      <div className="bg-cyan-500 w-3 h-3 rounded-full"></div>
                      {txt}
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-col gap-2 mt-5">
                {[
                  "Believe in Us",
                  "A legacy of Excellence",
                  "Always Caring",
                ].map((txt) => (
                  <div key={txt} className="flex gap-2 text-lg items-center">
                    <div className="bg-cyan-500 w-3 h-3 rounded-full"></div>
                    {txt}
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-[600px] text-lg mt-5 text-start">
              We offer a full spectrum of medical services, including preventive
              care, primary care, specialty care, and diagnostic services, Our
              preventive care services focus on promoting good health and
              wellness through regular check-ups, screenings, and immunizations.
            </div>

            <div className="max-w-[600px] text-lg mt-5 text-start">
              We offer a full spectrum of medical services, including preventive
              care, primary care, specialty care, and diagnostic services, Our
              preventive care services focus on promoting good health and
              wellness through regular check-ups, screenings, and immunizations.
            </div>
          </div>
          {/* service component  */}

          <div className="flex flex-col gap-2">
            <ImageFallBack w="300px" />
            <ImageFallBack w="300px" />
          </div>
        </div>
      </div>
    </>
  );
}

export default OurOffer;
