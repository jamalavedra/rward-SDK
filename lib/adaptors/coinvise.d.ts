import { ComputeConfig } from '../types';
export default function getCoinviseData(address: string, computeConfig: ComputeConfig): Promise<{
    tokensCreated: number;
    nftsCreated: number;
    totalPoolCount: number;
    totalPoolTvl: number;
    totalCountSold: number;
    totalAmountSold: number;
    multisendCount: number;
    airdropCount: number;
    following: number;
    followers: number;
}>;
