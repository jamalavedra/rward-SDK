import { SiweMessage } from 'siwe';

interface ErrorType {
    error: any;
}
interface LogConfigType {
    node: string;
    apikey: string;
    pingResult: any | ErrorType;
    latestVersion: string;
    currentVersion: string;
}

declare class Rewards {
    apikey: string;
    node: string;
    constructor(apikey: string, node: string);
    send: (signerAddress: string, token: string, address: string, amount: number) => Promise<any | ErrorType>;
}

declare class Customers {
    apikey: string;
    node: string;
    constructor(apikey: string, node: string);
    create: (signerAddress: string, token: string, email: string) => Promise<any | ErrorType>;
}

declare class Auth {
    apikey: string;
    node: string;
    constructor(apikey: string, node: string);
    validate: (signerAddress: string, token: string) => Promise<any | ErrorType>;
    authenticate: (signerAddress: string, signature: any, timestamp: number, chain: string, accountId?: string) => Promise<any | ErrorType>;
    authenticateV2: (message: string, signature: string) => Promise<any | ErrorType>;
    getSignatureData(signerAddress: string, timestamp: number): string;
    getSignatureDataV2(uri: string, signerAddress: string, chainId: number, resources?: Array<string>): string;
    parseSignatureV2(message: string): SiweMessage;
}

declare class ConvoBase {
    apikey: string;
    node: string;
    version: string;
    constructor(apikey: string, node: string);
    logConfig: () => Promise<LogConfigType>;
    pingNode: () => Promise<any | ErrorType>;
    listNodes: () => string[];
    switchNode: (newNodeAddress: string) => void;
}

declare class Convo extends ConvoBase {
    rewards: Rewards;
    customers: Customers;
    auth: Auth;
    constructor(apikey: string, node?: string);
}

export { Convo };
