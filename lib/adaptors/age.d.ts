import { ComputeConfig } from '../types';
export default function getAge(address: string, computeConfig: ComputeConfig): Promise<{
    polygon: number;
    ethereum: number;
}>;
