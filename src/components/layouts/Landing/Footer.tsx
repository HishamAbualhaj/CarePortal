import Link from "next/link";
import React from "react";

function Footer() {
  const links = [
    { key: 1, text: "Appointment", link: "" },
    { key: 2, text: "Doctors", link: "" },
    { key: 3, text: "Services", link: "" },
    { key: 4, text: "About Us", link: "" },
  ];

  const contact = [
    { key: 1, text: "Call: (237) 681-812-255" },
    { key: 2, text: "Call: (237) 681-812-255" },
    { key: 3, text: "Call: (237) 681-812-255" },
    { key: 4, text: "Call: (237) 681-812-255" },
  ];
  return (
    <div className="max-container px-5">
      <div className="flex max-lg:flex-col max-lg:gap-10">
        <div className="flex flex-1 gap-1 font-bold text-xl">
          <div className="text-white">Care</div>
          <div className="text-black">Portal</div>
        </div>

        <div className="flex lg:border-l border-gray-100 lg:pl-5 flex-1 text-white flex-col gap-5">
          <div className="font-bold">Important Links</div>
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link className="" key={link.key} href={link.link}>
                {link.text}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex lg:border-l border-gray-100 lg:pl-5 flex-1 text-white flex-col gap-5">
          <div className="font-bold">Contact Us</div>
          <div className="flex flex-col gap-1">
            {contact.map((contact) => (
              <div key={contact.key} className="">
                {contact.text}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 lg:border-l border-gray-100 lg:pl-5 text-white flex-col gap-5">
          <div className="font-bold">Our Accounts</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
