import { ComputeConfig } from '../types';
export declare function getAllGitcoinData(): Promise<string[]>;
export declare function getGitcoinData(address: string, computeConfig: ComputeConfig): Promise<{
    funder: boolean;
}>;
