import Footer from "@/components/layouts/Landing/Footer";
import Header from "@/components/layouts/Landing/Header";
import ImageFallBack from "@/components/ui/ImageFallBack";
import Link from "next/link";
import React from "react";
import { sections } from "@/lib/sectionsData";
function page() {
  return (
    <>
      <div className="shadow-main">
        <Header />
      </div>
      <div className="bg-secondary">
        <div className="max-container py-[50px] px-5">
          <div className="text-4xl">Services</div>
          <div className="gap-5 grid grid-cols-3 mt-10">
            {sections.map((section, i) => (
              <div
                key={i}
                className="bg-white shadow-main rounded-md border border-gray-300 p-2"
              >
                <ImageFallBack />
                <div className="p-2">
                  <div className="text-xl mt-3">{section.title}</div>
                  <div className="text-gray-800 mt-3">{section.brief}</div>
                  <Link
                    href={`/services/${section.title.replace(/\s+/g, "")}`}
                    className="block mt-5 text-sky-400"
                  >
                    Learn More{" "}
                  </Link>
                </div>
              </div>
            ))}
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
