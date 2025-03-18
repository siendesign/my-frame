import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { base, mainnet, baseSepolia } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

export const projectId = "66b468134196e9d203d385e096160cc7";

export function getConfig() {
  return createConfig({
    chains: [baseSepolia],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
    transports: {
      [baseSepolia.id]: http(),
    },
  });
}
