export default function getMirrorData(address?: string): Promise<{
    addressInfo: {
        ens: string;
        writeTokens: string;
        hasOnboarded: boolean;
    };
    userProfile: {
        displayName: string;
        ens: string;
        domain: string;
        contributor: {
            publications: {
                ensLabel: string;
                displayName: string;
            }[];
        };
    };
}>;
