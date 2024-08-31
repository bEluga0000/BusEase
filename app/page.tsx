"use client";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
export default async function Home() {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/homebg4.jpg')" }}
    >
      Buse Ease app
    </div>
  );
}
