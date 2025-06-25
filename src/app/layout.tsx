import "../styles/global.css";

import { Poppins } from "next/font/google";
import ReactQueryProvider from "@/lib/react-query-provider";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Choose what you need
  variable: "--font-poppins", // Optional if using Tailwind or CSS var
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className={`antialiased`}>
        <ReactQueryProvider children={children} />
      </body>
    </html>
  );
}
