import { Button } from "@/components/ui/button";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { SendTransaction } from "./send-transaction";
import ReadContract from "./read-contract";
import MintNFT from "./mint-transaction";

function truncateWalletAddress(
  address: string,
  startLength: number = 4,
  endLength: number = 4
): string {
  // Calculate minimum required length for truncation
  const minTruncatableLength = startLength + endLength + 3; // 3 for '...'

  // Handle cases where truncation isn't possible
  if (address.length <= minTruncatableLength) {
    return address;
  }

  const prefix = address.startsWith("0x") ? "0x" : "";
  const mainPart = address.slice(prefix.length);

  const firstPart = mainPart.slice(0, startLength);
  const lastPart = mainPart.slice(-endLength);

  return `${prefix}${firstPart}...${lastPart}`;
}

export default function Account() {
  const { address, chain, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div className="border p-5 rounded-lg space-y-3 w-full">
      <div className="">
        {ensAvatar && <img alt="ens avatar" src={ensAvatar} />}
        {address && (
          <div className="text-gray-600">
            {ensName
              ? `${ensName} (${address})`
              : truncateWalletAddress(address)}
            {chain && <div className="text-gray-400">{chain.name}</div>}
            {chainId && <div className="text-gray-400">{chainId}</div>}
          </div>
        )}
        <Button
          className="w-full"
          variant={"destructive"}
          onClick={() => disconnect()}
        >
          Disconnect
        </Button>
      </div>
      <div className="mt-5">
        <SendTransaction />
      </div>
      <div className="">
        <MintNFT />
      </div>
      <div className="">
        <ReadContract address={address} />
      </div>
    </div>
  );
}
