export default function getFortaData(address: string): Promise<{
    severity: string;
    protocol: string;
    source: {
        tx_hash: string;
        agent: {
            id: string;
            name: null;
        };
    };
}[]>;
