"use client";
import React from "react";
import Title from "../../ui/Title";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageFallBack from "../../ui/ImageFallBack";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
function OurDoctors() {
  const doctorInfo = [
    {
      key: 1,
      name: "Hisham Abualhaj",
      title: "Pulmonology",
      link: "/",
      socials: [
        {
          key: 1,
          link: "",
          icon: null,
        },
        {
          key: 2,
          link: "",
          icon: null,
        },
        { key: 3, link: "", icon: null },
      ],
    },
    {
      key: 2,
      name: "Ali Mohammed",
      title: "Cardiovascular",
      link: "/",
      socials: [
        {
          key: 1,
          link: "",
          icon: null,
        },
        {
          key: 2,
          link: "",
          icon: null,
        },
        { key: 3, link: "", icon: null },
      ],
    },
    {
      key: 3,
      name: "Osama Ahmed",
      title: "Oncology",
      link: "/",
      socials: [
        {
          key: 1,
          link: "",
          icon: null,
        },
        {
          key: 2,
          link: "",
          icon: null,
        },
        { key: 3, link: "", icon: null },
      ],
    },
    {
      key: 4,
      name: "Osama Ahmed",
      title: "Oncology",
      link: "/",
      socials: [
        {
          key: 1,
          link: "",
          icon: null,
        },
        {
          key: 2,
          link: "",
          icon: null,
        },
        { key: 3, link: "", icon: null },
      ],
    },
    {
      key: 5,
      name: "Osama Ahmed",
      title: "Oncology",
      link: "/",
      socials: [
        {
          key: 1,
          link: "",
          icon: null,
        },
        {
          key: 2,
          link: "",
          icon: null,
        },
        { key: 3, link: "", icon: null },
      ],
    },
  ];
  return (
    <div className="max-container text-center relative xl:px-5 px-12">
      <div className="absolute"></div>
      <Title title="Trusted care" subtitle="Our Doctors" />
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={3}
        keyboard={{
          enabled: true,
          onlyInViewport: true, 
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          1280: {
            slidesPerView: 2,
          },
        }}
      >
        {doctorInfo.map((info) => (
          <SwiperSlide>
            <div
              key={info.key}
              className="flex flex-col border border-gray-200 rounded-md p-3 hover:opacity-85 transition mt-10"
            >
              <ImageFallBack />
              <div className="flex flex-col gap-2 bg-secondary py-10">
                <div className="text-blue-500 font-bold">{info.name}</div>
                <div className="text-blue-400">{info.title}</div>
              </div>

              <Link className="py-4 bg-blue-500 text-white" href={info.link}>
                View Profile
              </Link>
            </div>
          </SwiperSlide>
        ))}
        <div className="custom-next xl:-right-[100px] right-1">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
        <div className="custom-prev xl:-left-[100px]  left-1">
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
      </Swiper>
    </div>
  );
}

export default OurDoctors;
