import { ComputeConfig } from '../types';
export default function getAsyncartData(address: string, computeConfig: ComputeConfig): Promise<{
    totalCountSold: number;
    totalAmountSold: number;
}>;
