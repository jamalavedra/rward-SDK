import { ComputeConfig } from '../types';
export default function getZoraData(address: string, computeConfig: ComputeConfig): Promise<{
    totalCountSold: number;
    totalAmountSold: number;
}>;
