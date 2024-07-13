import BoardComponent from "./board/[id]/page";

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col items-center overflow-x-hidden ">
      <BoardComponent/>
    </main>
  );
}
