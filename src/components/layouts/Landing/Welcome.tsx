import React from "react";
import Title from "../../ui/Title";

function Welcome() {
  return (
    <>
      <div className="max-w-[992px] mx-auto text-center">
        <Title
          title="welcome to meddical"
          subtitle="A Great Place to Receive Care"
        />
        <div className="max-w-[800px] mx-auto text-center text-gray-600 text-xl mt-5 leading-[30px]">
          Welcome to our medical site, where you can find reliable and
          up-to-date information on a wide range of health topics, from
          preventive care to complex medical conditions. Our goal is to provide
          you with the resources and tools you need to make informed decisions
          about your health and well-being
        </div>

        <div className="img-section py-10"></div>
      </div>
    </>
  );
}

export default Welcome;
