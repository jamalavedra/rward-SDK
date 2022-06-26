import { ComputeConfig } from '../types';
export default function getEtherscanData(address: string, computeConfig: ComputeConfig): Promise<{
    labels: string[] | undefined;
}>;
