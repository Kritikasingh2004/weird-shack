import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Weird Shack",
  description: "Weirdest and nerdiest stuff on the internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.variable} text-foreground `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
