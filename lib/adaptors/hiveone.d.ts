import { ComputeConfig } from '../types';
export default function getHiveOneData(address: string, computeConfig: ComputeConfig): Promise<false | {
    error?: string | undefined;
}>;
