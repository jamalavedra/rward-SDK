import { Dictionary } from '../types';
export default function getArcxData(address: string): Promise<{
    totalScore: number;
    details: Dictionary<number>;
} | {
    totalScore: number;
    details: never[];
}>;
