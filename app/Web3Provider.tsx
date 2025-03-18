"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import type { ReactNode } from "react";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [baseSepolia],
    transports: {
      // RPC URL for each chain
      [baseSepolia.id]: http(),
    },
    // Required API Keys
    walletConnectProjectId: "66b468134196e9d203d385e096160cc7" as string,

    // Required App Info
    appName: "wagmi test",

    // Optional App Info
    appDescription: "Open Edition Mint for Degens With Attitude",
    appUrl: "http://localhost:3000/", // your app's url
    appIcon: "https://i.postimg.cc/yN8bpy1Y/Untitled-1024-x-1024-px.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
