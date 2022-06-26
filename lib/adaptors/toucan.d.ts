export default function getToucanData(address: string): Promise<{
    totalAmount: number;
} | {
    totalAmount?: undefined;
}>;
