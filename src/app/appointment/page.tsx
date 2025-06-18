import Footer from "@/components/layouts/Landing/Footer";
import Header from "@/components/layouts/Landing/Header";
import React from "react";
import Button from "@/components/ui/Button";
function page() {
  return (
    <>
      <div className="shadow-main">
        <Header />
      </div>

      <div className="flex flex-col gap-10">
        <div className="text-black/80 lg:py-[80px] py-[50px] bg-secondary font-bold text-2xl lg:pl-32 pl-10">
          Book An Appointment
        </div>
        <div className="lg:py-[50px] py-[35px] max-container">
          <div className="px-5">
            <div className="text-2xl">Book An Appointment</div>
            <div className="text-black/80 mt-3">
              Book an appointment with ease using our simple and intuitive
              system. Whether it's a routine check-up or a specialist
              consultation, you're just a few clicks away. Our scheduling
              feature ensures flexibility, letting you choose the time that
              suits you best. No more waiting in line or lengthy phone calls.
              Reserve your spot now and take control of your health journey.
            </div>

            <div className="mt-5 flex flex-col gap-5">
              <input placeholder="Name" type="text" />
              <input placeholder="Email" type="text" />
              <input type="date" />
              <select
                className="border border-gray-300 py-3 px-2"
                name=""
                id=""
              >
                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>v
                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
              </select>
              <textarea
                className="min-h-[250px]"
                placeholder="Your Message"
                name=""
                id=""
              ></textarea>

              <Button />
            </div>
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
