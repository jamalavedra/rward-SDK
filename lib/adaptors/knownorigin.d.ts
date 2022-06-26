import { ComputeConfig } from '../types';
export default function getKnownOriginData(address: string, computeConfig: ComputeConfig): Promise<{
    totalCountSold: number;
    totalAmountSold: number;
}>;
