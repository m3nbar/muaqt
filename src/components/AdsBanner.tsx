"use client";

import Script from "next/script";

const DESKTOP_KEY = "c32c2d55f578be8017401bd0b459c5c7";
const MOBILE_KEY = "5ea2a11b2db1bbd4bc96ee33434bd6de";

export default function AdsBanner({ id }: { id: string }) {
  return (
    <>
      <Script id={`adsterra-d-${id}`} strategy="afterInteractive">
        {`
          if(window.innerWidth >= 768){
            window.atOptions = {
              key: '${DESKTOP_KEY}',
              format: 'iframe',
              width: 728,
              height: 90,
              params: {}
            };
            var c=document.getElementById('adstr-${id}');
            if(c){
              var s=document.createElement('script');
              s.src='https://www.highperformanceformat.com/${DESKTOP_KEY}/invoke.js';
              s.async=true;
              c.appendChild(s);
            }
          }
        `}
      </Script>
      <Script id={`adsterra-m-${id}`} strategy="afterInteractive">
        {`
          if(window.innerWidth < 768){
            window.atOptions = {
              key: '${MOBILE_KEY}',
              format: 'iframe',
              width: 320,
              height: 50,
              params: {}
            };
            var c=document.getElementById('adstr-${id}');
            if(c){
              var s=document.createElement('script');
              s.src='https://www.highperformanceformat.com/${MOBILE_KEY}/invoke.js';
              s.async=true;
              c.appendChild(s);
            }
          }
        `}
      </Script>
      <div className="flex justify-center items-center my-4 overflow-hidden">
        <div id={`adstr-${id}`} className="w-full min-h-[50px] md:min-h-[90px]" />
      </div>
    </>
  );
}
