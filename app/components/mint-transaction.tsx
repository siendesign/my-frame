import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useWriteContract } from "wagmi";
import { abi } from "@/utils/abi";

const MintNFT = () => {
  const { data: hash, writeContract } = useWriteContract();
  
  //on submit handler
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string;

    writeContract({
        address:'0xA62BbE465C9985FEF35254fa7254fa354A31a76C',
        abi: abi,
        functionName: 'mintPass',
        args: [BigInt(amount)]
    })
  }

  return (
    <div className="">
      <form onSubmit={submit} className="flex item-center gap-4">
        <Input name="amount" placeholder="1" required />
        <Button type="submit">mint</Button>
      </form>
      {hash && <div className="">transaction hash: {hash}</div>}
    </div>
  );
};

export default MintNFT;
