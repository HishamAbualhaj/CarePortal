import React from "react";
import Title from "../../ui/Title";
import ImageFallBack from "@/components/ui/ImageFallBack";
import Image from "next/image";
import Link from "next/link";

async function OurNews() {
  const news = [
    {
      key: 1,
      title: "This is a title for medical news",
      subtitle:
        "Subtitle for medical news just for fallback related to the news",
      link: "1",
      image_url: "",
    },
    {
      key: 2,
      title: "This is a title for medical news",
      subtitle:
        "Subtitle for medical news just for fallback related to the news",
      link: "1",
      image_url: "",
    },
    {
      key: 3,
      title: "This is a title for medical news",
      subtitle:
        "Subtitle for medical news just for fallback related to the news",
      link: "1",
      image_url: "",
    },
    {
      key: 4,
      title: "This is a title for medical news",
      subtitle:
        "Subtitle for medical news just for fallback related to the news",
      link: "1",
      image_url: "",
    },
  ];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getRecentNews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
  const data = await res.json();

  return (
    <div className="max-container px-5">
      <Title title="getting information" subtitle="News" />
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-10 gap-5">
        {typeof data?.msg === "string"
          ? news.map((item: Record<string, any>, i: number) => (
              <div
                key={i}
                className="shadow-main flex items-start gap-2 border border-gray-200"
              >
                <ImageFallBack h="200px" />

                <div className="flex flex-col gap-2 p-3 w-full">
                  <div className="text-blue-400">{item.title}</div>
                  <div className="text-black/80">{item.subtitle}</div>
                </div>
              </div>
            ))
          : data?.msg.map((item: Record<string, any>, i: number) => (
              <div
                key={i}
                className="shadow-main flex items-start gap-2 border border-gray-200"
              >
                {data.msg.image_url ? (
                  <Image
                    alt="News image"
                    width={500}
                    height={500}
                    className="w-full h-auto"
                    src={data.msg.image_url}
                  />
                ) : (
                  <ImageFallBack h="200px" />
                )}

                <div className="flex flex-col gap-2 p-3 w-full">
                  <div className="text-blue-400">{item.title}</div>
                  <div className="text-black/80">{item.subtitle}</div>
                  <Link
                    className="mt-5 border w-fit bg-blue-400 text-white p-2 rounded-md"
                    href={`/news/${item.id}`}
                  >
                    Read more
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default OurNews;
