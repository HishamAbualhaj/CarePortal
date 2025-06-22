import Header from "@/components/layouts/Landing/Header";
import ImageFallBack from "@/components/ui/ImageFallBack";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

function page() {
  const date = new Date().toISOString().split("T")[0];

  const recentNews = [
    { title: "The title of medical news", date: date },
    { title: "The title of medical news", date: date },
    { title: "The title of medical news", date: date },
    { title: "The title of medical news", date: date },
  ];

  const trendingNews = [
    {
      title: "This is the title for medical news",
      subtitle: "This is the subtitle for medical news",
      date: date,
      user: "Hisham Abualhaj",
      link: "/",
    },
    {
      title: "This is the title for medical news",
      subtitle: "This is the subtitle for medical news",
      date: date,
      user: "Hisham Abualhaj",
      link: "/",
    },
    {
      title: "This is the title for medical news",
      subtitle: "This is the subtitle for medical news",
      date: date,
      user: "Hisham Abualhaj",
      link: "/",
    },
    {
      title: "This is the title for medical news",
      subtitle: "This is the subtitle for medical news",
      date: date,
      user: "Hisham Abualhaj",
      link: "/",
    },
  ];
  return (
    <>
      <div className="shadow-main">
        <Header />
      </div>

      <div className="flex xl:px-5 lg:px-24 px-5 py-10 gap-10 max-container xl:items-start max-xl:flex-col">
        <div className="flex-1 max-xl:order-1 flex flex-col gap-5">
          <div className="text-black/80 text-4xl font-bold border-b border-gray-300 pb-5">
            Trending News
          </div>
          <div className="flex flex-col gap-5">
            {trendingNews.map((news, i) => (
              <div key={i} className="border border-gray-300 rounded-md">
                <ImageFallBack h="300px" />
                <div className=" bg-secondary">
                  <div className="p-5">
                    <div className="flex justify-between">
                      <div className="text-black/80">{news.date}</div>
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          className="text-gray-400"
                          icon={faUser}
                        />
                        <div className="text-black">{news.user}</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xl text-blue-600 font-bold">
                        {news.title}
                      </div>
                      <div className="text-md">{news.subtitle}</div>
                    </div>
                  </div>
                  <Link href={news.link}>
                    <div className="bg-blue-100 py-3 px-5">Read more</div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 md:min-w-[420px]  max-xl:flex-1">
          <input type="text" placeholder="Search" />
          <div className="border border-gray-300 rounded-md">
            <div className="font-bold text-center text-xl py-3">
              Recent Posts
            </div>
            <div className="p-2 flex flex-col h-[600px] gap-3 overflow-auto">
              {recentNews.map((news, i) => (
                <Link
                  className="hover:bg-gray-200/50 p-5 transition rounded-sn"
                  key={i}
                  href="/"
                >
                  <div className="flex items-center gap-4 border-b border-gray-300 pb-3">
                    <ImageFallBack w="150px" h="150px" />
                    <div className="">
                      {news.date}
                      <div className="mt-3">{news.title}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
