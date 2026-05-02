import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Marvin & Jovelyn Wedding",
  description:
    "Marvin and Jovelyn wedding website, wedding will be at Santa Rosa in September 11, 2026, come and join us at our wedding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
