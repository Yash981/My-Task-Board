import { auth } from "@/auth";
import BoardComponent from "./board/[id]/page";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <main className="w-screen h-screen flex flex-col items-center overflow-x-hidden">
      <BoardComponent/>
    </main>
  );
}
