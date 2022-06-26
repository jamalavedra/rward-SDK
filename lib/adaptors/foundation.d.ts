import { ComputeConfig } from '../types';
export default function getFoundationData(address: string, computeConfig: ComputeConfig): Promise<{
    totalCountSold: number;
    totalAmountSold: number;
    followerCount: number;
    followingCount: number;
}>;
