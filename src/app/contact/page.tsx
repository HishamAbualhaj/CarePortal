import Footer from "@/components/layouts/Landing/Footer";
import Header from "@/components/layouts/Landing/Header";
import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import React from "react";

function page() {
  const contactInfo = [
    {
      icon: "📞",
      title: "EMERGENCY",
      lines: ["(+972) 432-678-123", "(+972) 432-678-123"],
    },
    {
      icon: "📍",
      title: "LOCATION",
      lines: ["Palestine - Gaza", "9876 Some country"],
    },
    {
      icon: "✉️",
      title: "EMAIL",
      lines: ["Medicalcare@gmail.com", "mywebstudios@gmail.com"],
    },
    {
      icon: "⏰",
      title: "WORKING HOURS",
      lines: ["Mon-Sat 09:00-20:00", "Sunday Emergency only"],
    },
  ];
  return (
    <>
      <div className="shadow-main">
        <Header />
      </div>
      <div className="max-container py-[80px]">
        <div className="flex gap-3 max-xl:flex-col px-5">
          <div className="bg-secondary rounded-lg p-5 flex-1">
            <Title title="get in touch" subtitle="Contact" />
            <div className="flex mt-5 flex-col gap-5">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Email" />
              <input type="text" placeholder="Subject" />
              <textarea
                className="min-h-[200px]"
                placeholder="Your Message"
                name=""
                id=""
              ></textarea>
              <Button />
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactInfo.map((item, idx) => (
              <div key={idx} className="bg-secondary p-4 rounded-md">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-sm text-gray-700 mb-1">
                  {item.title}
                </h3>
                {item.lines.map((line, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-[30] bg-blue-500">
        <Footer />
      </div>
    </>
  );
}

export default page;
