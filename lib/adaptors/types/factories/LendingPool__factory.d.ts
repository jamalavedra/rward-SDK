import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { LendingPool, LendingPoolInterface } from "../LendingPool";
export declare class LendingPool__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): LendingPoolInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): LendingPool;
}
