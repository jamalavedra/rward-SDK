import { ComputeConfig, ErrorType } from './types';
import * as adaptorList from './adaptors';
declare class Omnid {
    #private;
    apikey: string;
    node: string;
    adaptors: typeof adaptorList;
    constructor(apikey: string, node: string);
    getTrustScore: (address: string, noCache?: boolean | undefined) => Promise<any | ErrorType>;
    getTrustScoreWithProof: (address: string) => Promise<any | ErrorType>;
    computeTrustScore: (address: string, computeConfig: ComputeConfig, disabledAdaptors?: Array<string>) => Promise<any | ErrorType>;
}
export default Omnid;
