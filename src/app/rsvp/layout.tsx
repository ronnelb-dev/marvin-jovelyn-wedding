import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "RSVP - Marvin & Jovelyn Wedding",
  description: "RSVP for Marvin and Jovelyn's wedding celebration",
};

export default function RSVPLayout({ children }: { children: ReactNode }) {
  return children;
}
