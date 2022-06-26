export default function getLayer3Data(address: string): Promise<{
    user: {
        address: string;
        contributions: string[];
        gmStreak: number;
        id: number;
        level: number;
        submissionStats: string[];
        twitterUsername: string;
        username: string;
        xp: number;
        xpRequiredForNextLevel: number;
    };
}>;
