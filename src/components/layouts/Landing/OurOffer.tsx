import React from "react";
import Title from "../../ui/Title";
import Link from "next/link";
import Offer_Image from "../../../../public/offer_image.png";
import Image from "next/image";

function OurOffer() {
  return (
    <>
      <div className="max-w-[992px] mx-auto px-5 py-[80px] text-center">
        <Title title="Care you can believe in" subtitle="Our Offer" />
        <div className="mt-10 flex gap-5 max-xl:flex-col xl:items-start items-center justify-between">
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
              We provide comprehensive healthcare solutions designed to meet
              every stage of life. Our services include expert primary care,
              advanced specialty treatments, diagnostic testing, and ongoing
              health monitoring. With a focus on patient-centered care, we are
              committed to delivering personalized treatment plans, preventive
              screenings, and timely interventions to support long-term
              well-being and peace of mind.
            </div>
          </div>
          {/* service component  */}

          <div className="flex flex-col gap-2">
            <Image
              alt=""
              height={500}
              width={500}
              className="w-full h-auto"
              src={Offer_Image}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default OurOffer;
