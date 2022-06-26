export default function getContextData(address: string): Promise<{
    followerCount: number;
    followingCount: number;
}>;
