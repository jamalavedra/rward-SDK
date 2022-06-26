import { ErrorType, LogConfigType } from './types';
declare class ConvoBase {
    apikey: string;
    node: string;
    constructor(apikey: string, node: string);
    getApiKey(): string;
    logConfig: () => Promise<LogConfigType>;
    ping: () => Promise<any | ErrorType>;
}
export default ConvoBase;
