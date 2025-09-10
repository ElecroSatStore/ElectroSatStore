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
    <head>
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject = t;
  var ttq = w[t] = w[t] || [];
  ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
  ttq.setAndDefer = function (obj, method) {
    obj[method] = function () { obj.push([method].concat([].slice.call(arguments, 0))); };
  };
  for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);

  ttq.instance = function (id) {
    ttq._i = ttq._i || {};
    var inst = ttq._i[id] || [];
    for (var n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(inst, ttq.methods[n]);
    return inst;
  };

  ttq.load = function (id, opts) {
    var src = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i = ttq._i || {}; ttq._i[id] = ttq._i[id] || []; ttq._i[id]._u = src;
    ttq._t = ttq._t || {}; ttq._t[id] = +new Date;
    ttq._o = ttq._o || {}; ttq._o[id] = opts || {};
    var s = d.createElement("script"); s.type = "text/javascript"; s.async = true; s.src = src + "?sdkid=" + id + "&lib=" + t;
    var x = d.getElementsByTagName("script")[0]; x.parentNode.insertBefore(s, x);
  };

  ttq.load('D2F2GIJC77U9PLHEK440');
  ttq.page();
}(window, document, 'ttq');
</script>

    </head>
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
