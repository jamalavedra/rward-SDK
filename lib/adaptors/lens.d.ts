export default function getLensData(address: string): Promise<{
    profileId: number;
    pubCount: number;
    handle: string;
    imageURI: string;
    following: number;
} | {
    profileId?: undefined;
    pubCount?: undefined;
    handle?: undefined;
    imageURI?: undefined;
    following?: undefined;
}>;
