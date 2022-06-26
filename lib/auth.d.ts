import { SiweMessage } from 'siwe';
import { ErrorType } from './types';
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
export default Auth;
