import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Traffic Control Dashboard",
  description: "A comprehensive dashboard for monitoring traffic violations and enforcement",
};

import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
