'use client';
import { useEffect, useState } from "react";
// @ts-ignore
import sdk, { type FrameContext } from "@farcaster/frame-sdk";
import { WalletOptions } from "./wallet-options";
import { useAccount } from "wagmi";
import Account from "./account";
import ConnectButton from "./appkit-connect";
import { ConnectKitButton } from "connectkit";


export default function Demo() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  function ConnectWallet() {
    const { isConnected } = useAccount();
    if (isConnected) return <Account />;
    return <ConnectButton />;
  }

  return (
    <div className="w-[300px] mx-auto py-4 px-2">
      <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
        {JSON.stringify(context, null, 2)}
      </pre>

      <div className="flex flex-col gap-2 mt-4">
        <ConnectKitButton />
        <ConnectWallet />
      </div>
    </div>
  );
}
