import React from "react";

interface titleProps {
  title: string;
  subtitle: string;
}
function Title({ title, subtitle }: titleProps) {
  return (
    <>
      <div className="text-cyan-500 uppercase text-2xl">{title}</div>
      <div className="text-blue-900 font-bold text-4xl mt-3">{subtitle}</div>
    </>
  );
}

export default Title;
