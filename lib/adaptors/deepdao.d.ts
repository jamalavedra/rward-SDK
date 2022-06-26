export default function getDeepDaoData(address: string): Promise<{
    score?: undefined;
    rank?: undefined;
    relativeScore?: undefined;
    daos?: undefined;
    proposals?: undefined;
    votes?: undefined;
} | {
    score: number;
    rank: number;
    relativeScore: number;
    daos: number;
    proposals: number;
    votes: number;
}>;
