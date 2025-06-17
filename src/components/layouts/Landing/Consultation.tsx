"use client";
import React from "react";
import Title from "../../ui/Title";
import Button from "../../ui/Button";

function Consultation() {
  return (
    <div className="max-container px-5">
      <div className="flex justify-between max-xl:flex-col max-xl:gap-10">
        <div>
          <Title title="Telemedicine consultation" subtitle="" />
          <div className="mt-5 max-w-[550px] text-lg leading-[30px]">
            I highly recommend you to have a telemedicine consultation with a
            doctor. Telemedicine consultation allows you to receive medical
            evaluation and necessary advice without the need to physically visit
            a medical clinic. Through telemedicine, you can discuss your
            symptoms and health concerns the doctor.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 max-md:flex-col">
            <input className="flex-1" type="text" placeholder="Name" />
            <input className="flex-1" type="text" placeholder="Email" />
          </div>
          <div className="flex gap-2 max-md:flex-col">
            <input type="number" placeholder="Phone number" />
            <select className="w-full min-h-[50px] border border-gray-300 text-black/80" name="" id="">
              <option value="Doctor">Doctor 1</option>
              <option value="Doctor">Doctor 2</option>
              <option value="Doctor">Doctor 3</option>
            </select>
          </div>

          <textarea
           className="min-h-[250px]"
            placeholder="Your Message"
            name=""
            id=""
          ></textarea>

          <Button buttonAction={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default Consultation;
