import Image from "next/image";
import TextBox from "./textbox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div >
        <TextBox></TextBox>
      </div>
    </main>
  );
}
