import { Button } from "@/components/ui/button";
import {Connector, useConnect} from "wagmi";


export function WalletOptions(){
    const {connectors, connect} = useConnect()

    return(

    <div className="flex flex-col gap-2">
        {connectors.map((connector)=>(
           <Button key={connector.id} variant={"outline"} onClick={() => connect({connector})}>
               {connector.name}
           </Button>
       ))}

    </div>
    )
}