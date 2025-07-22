import Footer from "@/components/layouts/Landing/Footer";
import Header from "@/components/layouts/Landing/Header";
import ImageFallBack from "@/components/ui/ImageFallBack";
import Link from "next/link";
import React from "react";
import { sections } from "@/lib/sectionsData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {
  params: Promise<{
    id: string;
  }>;
};
async function Page({ params }: Props) {
  const { id } = await params;

  const items = [
    "A Passion for Healing",
    "All our best",
    "5-Star Care",
    "Believe in Us",
    "A Legacy of Excellence",
    "Always Caring",
  ];

  const section = sections.find(
    (section) => section.title.replace(/\s+/g, "") === id
  );
  return (
    <>
      <div className="shadow-main">
        <Header />
      </div>
      <div className="bg-secondary px-5">
        <div className="max-container py-[50px]">
          <div className="flex max-lg:flex-col gap-10">
            <div className="border border-gray-300 rounded-md flex flex-col gap-1 h-fit">
              {sections.map((section, i) => (
                <Link
                  href={`${section.title.replace(/\s+/g, "")}`}
                  className={`${
                    section.title.replace(/\s+/g, "") === id
                      ? "bg-blue-800 text-white"
                      : ""
                  } py-5 px-10 hover:bg-blue-200 flex gap-2 items-center`}
                  key={i}
                >
                  <FontAwesomeIcon
                    className="text-cyan-500"
                    icon={section.icon}
                  />
                  {section.title}
                </Link>
              ))}
            </div>
            <div className="flex-1">
              <ImageFallBack />
              <div className="mt-5">
                <div className="text-2xl text-blue-700 uppercase">
                  {section?.title}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-3 mt-2">
                  {items.map((text, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 bg-blue-500 rounded-full" />
                      <span className="text-gray-800">{text}</span>
                    </div>
                  ))}
                </div>
                <div className="text-lg mt-2">{section?.description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-500 py-[40px]">
        <Footer />
      </div>
    </>
  );
}

export default Page;
