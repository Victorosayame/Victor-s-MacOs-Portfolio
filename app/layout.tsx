import type { Metadata } from "next";
import { Georama, Roboto } from "next/font/google";
import "./globals.css";

//step1 create nextjs app and import public folder constant folder favicon css and update the next font used in this case georama ad roboto

const georama = Georama({
  variable: "--font-georama",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Victor's Portfolio",
  description: "Victor's MacOs Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${georama.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
