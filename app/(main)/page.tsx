import { UserButton } from "@clerk/nextjs";
// import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex justify-end px-10">
        <UserButton />
      </div>
    </div>
  );
}
