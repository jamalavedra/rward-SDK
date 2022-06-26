export interface Dictionary<T> {
    [Key: string]: T;
}
export interface ErrorType {
    error: any;
}
export interface LogConfigType {
    node: string;
    apikey: string;
    pingResult: any | ErrorType;
    latestVersion: string;
    currentVersion: string;
}
export declare type CommentsQueryType = {
    threadId?: string;
    url?: string;
    author?: string;
    tag1?: string;
    tag2?: string;
    replyTo?: string;
    latestFirst?: string;
    page?: string;
    pageSize?: string;
};
export declare type ThreadsQueryType = {
    threadId?: string;
    createdOn?: string;
    creator?: string;
    title?: string;
    url?: string;
    isReadPublic?: string;
    isWritePublic?: string;
    member?: string;
    moderator?: string;
    keyword1?: string;
    keyword2?: string;
    keyword3?: string;
    page?: string;
    pageSize?: string;
    latestFirst?: boolean;
    countOnly?: boolean;
};
export declare type ComputeConfig = {
    polygonMainnetRpc: string;
    etherumMainnetRpc: string;
    avalancheMainnetRpc: string;
    maticPriceInUsd: number;
    etherumPriceInUsd: number;
    deepdaoApiKey: string;
    etherscanApiKey: string;
    polygonscanApiKey: string;
    CNVSEC_ID: string;
    DEBUG: boolean;
};
export declare type AdaptorFunctionParamsType = {
    address: string;
};
export declare type AdaptorFunctionParamsWithConfigType = {
    address: string;
    computeConfig: ComputeConfig;
};
export declare type AdaptorFunctionType = (address: string) => Promise<any>;
export declare type AdaptorFunctionWithConfigType = (address: string, computeConfig: ComputeConfig) => Promise<any>;
