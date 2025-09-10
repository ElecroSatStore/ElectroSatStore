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
  title: "SatStore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className}`}
      > 
        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
  ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat([].slice.call(arguments,0)));}};
  for(var i=0;i<ttq.methods.length;i++) ttq.setAndDefer(ttq,ttq.methods[i]);
  ttq.instance=function(t){var e=ttq._i[t]||[];for(var n=0;n<ttq.methods.length;n++) ttq.setAndDefer(e,ttq.methods[n]);return e};
  ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;
    ttq._o=ttq._o||{};ttq._o[e]=n||{};
    var a=d.createElement("script");a.type="text/javascript";a.async=!0;a.src=i+"?sdkid="+e+"&lib="+t;
    var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(a,s);
  };
}(window, document, 'ttq');
ttq.load('D2F2GIJC77U9PLHEK440');
ttq.page();
`}}
/>
       <One>
        {children}
        </One>
        <Analytics/>
      </body>
    </html>
  );
}
