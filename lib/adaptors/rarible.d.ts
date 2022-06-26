import { ComputeConfig } from '../types';
export default function getRaribleData(address: string, computeConfig: ComputeConfig): Promise<{
    followings: number;
    followers: number;
    blacklisted: boolean;
    shortUrl: string;
    totalCountSold: number;
    totalAmountSold: number;
}>;
