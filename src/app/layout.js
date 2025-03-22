import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import '../styles/table.css'
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import One from "@/components/providers/One";
import { Analytics } from "@vercel/analytics/react"


const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "IPDEMO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className}`}
      > 
       <One>
        {children}
        </One>
        <Analytics/>
      </body>
    </html>
  );
}
