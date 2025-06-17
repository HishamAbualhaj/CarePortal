import React from "react";
import Title from "../../ui/Title";
import ImageFallBack from "@/components/ui/ImageFallBack";

function OurNews() {
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
  return (
    <div className="max-container px-5">
      <Title title="getting information" subtitle="News" />
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-10 gap-5">
        {news.map((newInfo) => (
          <div
            key={newInfo.key}
            className="shadow-main flex items-start gap-2 border border-gray-200"
          >
            <ImageFallBack  h="200px"/>
            <div className="flex flex-col gap-2 p-3 w-full">
              <div className="text-blue-400">{newInfo.title}</div>
              <div className="text-black/80">{newInfo.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurNews;
