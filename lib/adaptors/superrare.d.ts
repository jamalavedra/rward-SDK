export default function getSuperrareData(address: string): Promise<{
    totalCreated: number;
    totalCountSold: number;
    totalAmountSold: number;
} | {
    totalCreated?: undefined;
    totalCountSold?: undefined;
    totalAmountSold?: undefined;
}>;
