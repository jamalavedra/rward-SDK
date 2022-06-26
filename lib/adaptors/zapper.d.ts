export default function getZapperData(address: string): Promise<{
    followers: number;
    following: number;
    xp: string;
    zp: number;
}>;
