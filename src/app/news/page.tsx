"use client";
import Header from "@/components/layouts/Landing/Header";
import ImageFallBack from "@/components/ui/ImageFallBack";
import { AuthContext } from "@/context/AuthContextUser";
import { baseURL } from "@/helpers/getApiUrl";
import useFetch from "@/hooks/useFetch";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
function page() {
  const user = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>("");
  const [inputData, setInputData] = useState<string>("");

  useEffect(() => {
    setUserToken(user?.user?.token ?? "");
  }, [user]);

  const { data } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      return await useFetch(`${baseURL}/api/getNews`, "GET", {}, userToken);
    },
    enabled: !!userToken,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputData(value);
  };

  const { data: recentNews, isLoading } = useQuery({
    queryKey: ["recentnews", inputData],
    queryFn: async () => {
      return await useFetch("/api/getRecentNews", "POST", {
        search: inputData,
      });
    },
    staleTime: 1000 * 60,
  });

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
            {typeof data?.msg === "string" ? (
              []
            ) : data?.msg.length ? (
              data?.msg.map((news: Record<string, any>, i: number) => (
                <div key={i} className=" border-gray-300 rounded-md">
                  {news?.image_url ? (
                    <div className="">
                      <Image
                        className="w-full h-auto object-cover"
                        width={1000}
                        height={500}
                        alt="New pic"
                        src={news?.image_url}
                      />
                    </div>
                  ) : (
                    <ImageFallBack h="300px" />
                  )}

                  <div className=" bg-secondary">
                    <div className="p-5">
                      <div className="flex justify-between">
                        <div className="text-black/80">{news.created_at}</div>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            className="text-gray-400"
                            icon={faUser}
                          />
                          <div className="text-black">{news.doctor}</div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="text-xl text-blue-600 font-bold">
                          {news.title}
                        </div>
                        <div className="text-md mt-3">{news.subtitle}</div>
                      </div>
                    </div>
                    <Link href={`/news/${news.id}`}>
                      <div className="bg-blue-100 py-3 px-5">Read more</div>
                    </Link>
                  </div>
                </div>
              ))
            ) : isLoading ? (
              <div className="text-2xl text-center mt-5 animate-pulse">
                Loading ...
              </div>
            ) : (
              <div className="text-xl mt-5 text-center">No Data Found</div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 md:min-w-[420px]  max-xl:flex-1">
          <div className="flex items-center gap-2">
            <input
              value={inputData}
              onChange={handleChange}
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="border border-gray-300 rounded-md">
            <div className="font-bold text-center text-xl py-3">
              Recent Posts
            </div>
            <div className="p-2 flex flex-col h-[600px] gap-3 overflow-auto">
              {typeof recentNews?.msg === "string" ? (
                <div className="text-xl mt-5 text-center">
                  {recentNews?.msg}
                </div>
              ) : recentNews?.msg.length ? (
                recentNews?.msg.map((news: Record<string, any>, i: number) => (
                  <Link
                    className="hover:bg-gray-200/50 p-5 transition rounded-sn"
                    key={i}
                    href="/"
                  >
                    <div className="flex md:flex-row flex-col items-start gap-4 border-b border-gray-300 pb-3">
                      {news?.image_url ? (
                        <div className="md:max-w-[200px]">
                          <Image
                            className="w-full h-auto object-cover"
                            width={1000}
                            height={500}
                            alt="New pic"
                            src={news?.image_url}
                          />
                        </div>
                      ) : (
                        <ImageFallBack w="150px" h="150px" />
                      )}

                      <div className="">
                        {news.created_at}
                        <div className="mt-3">{news.title}</div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : isLoading ? (
                <div className="text-2xl text-center mt-5 animate-pulse">
                  Loading ...
                </div>
              ) : (
                <div className="text-xl mt-5 text-center">No Data Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
