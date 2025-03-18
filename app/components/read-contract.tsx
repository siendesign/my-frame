"use client";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  type BaseError,
} from "wagmi";
import { wagmiContractConfig } from "@/utils/contracts";
import { abi } from "@/utils/abi";

interface Props {
  address?: string
}

export default function ReadContract({address}:Props) {
  
  const { data: balance} = useReadContract({
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args:[ address as `0x${string}`, BigInt(0)]
  })

  return (
    <div className="">
      <div className="">NFT(s) Minted: {balance ? Number(balance) : 0} </div>
      {}
    </div>
  );
}
 