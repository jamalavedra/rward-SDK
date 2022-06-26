export default function getKarmaData(address: string): Promise<false | {
    score: number;
    daos: string[];
}>;
