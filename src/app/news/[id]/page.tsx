import Header from "@/components/layouts/Landing/Header";
import Image from "next/image";
type Props = {
  params: {
    id: string;
  };
};
async function page({ params }: Props) {
  const { id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getNewsId`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const data = await res.json();

  return (
    <>
      <div className="shadow-main">
        <Header />
      </div>
       <div className="text-black/80 lg:py-[80px] py-[50px] bg-secondary font-bold text-2xl lg:pl-32 pl-10">
          News Page
        </div>

      <div className="max-container py-10 px-5 my-10">
        <div className="flex justify-between">
          <div className="">
            <div className="lg:text-4xl text-2xl">{data.msg.title}</div>
            <div className="text-2xl mt-3 text-gray-500">
              {data.msg.subtitle}
            </div>
          </div>

          <div className="text-lg font-bold ">{data.msg.doctor}</div>
        </div>
        {data.msg.image_url && (
          <Image
            alt="news image"
            width={500}
            height={500}
            src={data.msg.image_url}
            className="w-full h-auto mt-5"
          />
        )}

        <div className="mt-10 text-xl">{data.msg.description}</div>
      </div>
    </>
  );
}

export default page;
