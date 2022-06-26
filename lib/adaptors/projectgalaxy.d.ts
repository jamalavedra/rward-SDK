export default function getProjectGalaxyData(address: string): Promise<{
    id: string;
    username: string;
    eligibleCredentials: {
        list: {
            id: string;
            name: string;
        }[];
    };
}>;
