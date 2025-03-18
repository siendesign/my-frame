import { Button } from "@/components/ui/button";
import { type BaseError, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { Input } from "@/components/ui/input";

export function SendTransaction() {
  const { data: hash, isPending,error, sendTransaction } = useSendTransaction();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as `0x${string}`;
    const value = formData.get("value") as string;
    sendTransaction({ to, value: parseEther(value) });
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <Input type="text" name="address" className="" placeholder="0xA0Cf…251e" required />
      <Input type="text" name="value" className="" placeholder="0.05" required />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Confirming..." : "send"}
      </Button>
      {hash && <div className="">transaction hash: {hash}</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}

    </form>
  );
}
