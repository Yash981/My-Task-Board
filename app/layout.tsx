import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SheetProvider from "@/providers/sheet-provider";
import { QueryProvider } from "@/providers/query-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import TaskBoardComponent from "@/components/TaskBoardComponent";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  // console.log(session)
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={outfit.className} >
          <QueryProvider>
            <SheetProvider />
            <div className="w-screen h-screen flex flex-col mx-auto">
              <TaskBoardComponent />
              {children}
            </div>
          </QueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
