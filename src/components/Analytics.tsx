"use client";

import Script from "next/script";

/**
 * Google Analytics 4 + Cloudflare Web Analytics
 *
 * Environment variables:
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID  — Google Analytics 4 measurement ID (G-XXXXXXXXXX)
 *   NEXT_PUBLIC_CF_BEACON_TOKEN    — Cloudflare Web Analytics beacon token
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const cfBeacon = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

  return (
    <>
      {/* Google Analytics 4 */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {/* Cloudflare Web Analytics */}
      {cfBeacon && (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${cfBeacon}"}`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
