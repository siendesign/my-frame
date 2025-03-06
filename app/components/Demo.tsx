'use client';
import { useEffect, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";


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

  return (
    <div className="w-[300px] mx-auto py-4 px-2">
      <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
        {JSON.stringify(context, null, 2)}
      </pre>
    </div>
  );
}
