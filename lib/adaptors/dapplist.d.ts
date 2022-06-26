export default function getDapplistData(address: string): Promise<{
    score: number;
    dapps: string[];
}>;
