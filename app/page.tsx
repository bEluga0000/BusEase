"use client";
import {signIn, useSession} from "next-auth/react"
import { useEffect } from "react";
export default function Home() {
  const session = useSession()
  return (
    <div>
      BUSEASE
      <div>
        {JSON.stringify(session)}
      </div>
      <div>
        <button onClick={async()=>{
          await signIn("google")
        }}>sigin</button>
      </div>
    </div>
  );
}
