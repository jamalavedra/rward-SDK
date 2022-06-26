import { Dictionary, ErrorType } from './types';
export declare function fetcher(requestMethod: string, url: string, apikey?: string, body?: Dictionary<any>, customHeaders?: Dictionary<any>): Promise<any | ErrorType>;
export declare function encodeQuery(data: Dictionary<string | number | boolean>): string;
export declare function gqlFetcher(url: string, query: string, variables?: Dictionary<any>): Promise<Dictionary<any> | ErrorType>;
