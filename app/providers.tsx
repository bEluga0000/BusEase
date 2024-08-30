"use client";

import { Session } from "inspector";
import { SessionProvider } from "next-auth/react";
import {ThemeProvider} from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
    return <SessionProvider>
        <ThemeProvider attribute="class">
        {children}
        </ThemeProvider>
    </SessionProvider>
}