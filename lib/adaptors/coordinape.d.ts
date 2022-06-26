export default function getCoordinapeData(address: string): Promise<{
    teammates: number;
} | {
    teammates?: undefined;
}>;
