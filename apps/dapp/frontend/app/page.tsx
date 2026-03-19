"use client";

import { useWallet } from "@/components/wallet-provider";
import { ConnectWallet } from "@/components/connect-wallet";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { isConnected } = useWallet();
    const router = useRouter();

    useEffect(() => {
        if (isConnected) {
            router.push("/dashboard");
        }
    }, [isConnected, router]);

    if (isConnected) return null;

    return <ConnectWallet />;
}
