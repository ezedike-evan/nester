"use client";

import { useWallet } from "@/components/wallet-provider";
import { Navbar } from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { truncateAddress } from "@/lib/utils";
import { Sparkles, ArrowRight } from "lucide-react";

// Mock Data
import { 
    mockTransactions, 
    mockVaultPositions, 
    mockPortfolioStats 
} from "@/lib/mock-data";

// Components
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { VaultPositionsTable } from "@/components/dashboard/vault-positions-table";
import { PortfolioCharts } from "@/components/dashboard/portfolio-charts";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function Dashboard() {
    const { isConnected, address } = useWallet();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isConnected) {
            router.push("/");
        } else {
            // Simulate initial data fetch
            const timer = setTimeout(() => setIsLoading(false), 800);
            return () => clearTimeout(timer);
        }
    }, [isConnected, router]);

    if (!isConnected) return null;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="mx-auto max-w-[1536px] px-4 md:px-8 lg:px-12 xl:px-16 pt-20 md:pt-28 pb-24 md:pb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 md:mb-10"
                >
                    <h1 className="font-heading text-xl font-light text-foreground sm:text-2xl md:text-3xl">
                        Welcome back
                    </h1>
                    <p className="mt-1 text-muted-foreground font-mono text-xs sm:text-sm">
                        {address ? truncateAddress(address, 8) : ""}
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="mb-8 md:mb-10 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.1 + i * 0.08,
                            }}
                            className="group rounded-2xl border border-border bg-white p-4 sm:p-5 transition-all hover:border-black/15 hover:shadow-sm"
                        >
                            <div className="mb-3 sm:mb-4 flex items-center justify-between">
                                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-secondary">
                                    <stat.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-foreground/50" />
                                </div>
                                {stat.change && (
                                    <span className="flex items-center gap-0.5 text-[10px] sm:text-xs font-medium text-emerald-600">
                                        <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                        {stat.change}
                                    </span>
                                )}
                            </div>
                            <p className="text-xl sm:text-2xl font-heading font-light text-foreground">
                                {stat.value}
                            </p>
                            <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground leading-tight">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Panels — stacked on mobile, side by side on desktop */}
                <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="rounded-2xl border border-border bg-white p-5 sm:p-6"
                    >
                        <div className="mb-5 sm:mb-6 flex items-center justify-between">
                            <h2 className="font-heading text-base sm:text-lg font-light text-foreground">
                                Your Vaults
                            </h2>
                            <button className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors min-h-[44px] px-2 -mr-2 flex items-center">
                                Create Vault
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center py-10 sm:py-12 text-center">
                            <div className="mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-secondary">
                                <Vault className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                            </div>
                            <p className="text-sm font-medium text-foreground/80">
                                No vaults yet
                            </p>
                            <p className="mt-1 max-w-xs text-xs text-muted-foreground leading-relaxed">
                                Create your first vault to start earning
                                optimized yield across DeFi protocols.
                            </p>
                            <div className="mt-5 p-[3px] rounded-full border border-black/15 shadow-lg bg-white inline-block">
                                <Link href="/dashboard/vaults">
                                    <button className="rounded-full bg-gradient-to-r from-[#0a0a0a] to-[#1a1a2e] border border-white/10 hover:from-[#1a1a2e] hover:to-[#0a0a0a] px-6 py-2.5 text-sm font-medium text-white transition-all min-h-[44px]">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Prometheus Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="rounded-2xl border border-border bg-white p-5 sm:p-6"
                    >
                        <div className="mb-5 sm:mb-6 flex items-center justify-between">
                            <h2 className="font-heading text-base sm:text-lg font-light text-foreground">
                                <span className="font-display italic">Prometheus</span>{" "}
                                Insights
                            </h2>
                            <div className="flex items-center gap-1.5">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span className="text-xs text-muted-foreground">
                                    AI Advisory
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center py-10 sm:py-12 text-center">
                            <div className="mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-secondary">
                                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                            </div>
                            <p className="text-sm font-medium text-foreground/80">
                                No insights available
                            </p>
                            <p className="mt-1 max-w-xs text-xs text-muted-foreground leading-relaxed">
                                Connect a vault to receive AI-driven
                                recommendations on yield optimization and risk
                                management.
                            </p>
                        </div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-4 sm:mt-6 rounded-2xl border border-border bg-white p-5 sm:p-6"
                >
                    <h2 className="mb-4 font-heading text-base sm:text-lg font-light text-foreground">
                        Recent Activity
                    </h2>
                    <div className="flex items-center justify-center py-8 sm:py-10">
                        <p className="text-sm text-muted-foreground">
                            No recent transactions
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}