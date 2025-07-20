import "../styles/global.css";

import { Poppins } from "next/font/google";
import ReactQueryProvider from "@/lib/react-query-provider";
import AuthContextUser from "@/context/AuthContextUser";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Choose what you need
  variable: "--font-poppins", // Optional if using Tailwind or CSS var
});
import "react-toastify/dist/ReactToastify.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className={`antialiased`}>
        <AuthContextUser>
          <ReactQueryProvider children={children} />
        </AuthContextUser>
      </body>
    </html>
  );
}
