import { Dictionary, ErrorType, ThreadsQueryType } from './types';
declare class Threads {
    apikey: string;
    node: string;
    constructor(apikey: string, node: string);
    create: (signerAddress: string, token: string, title: string, description: string, url: string, isReadPublic: boolean, isWritePublic: boolean, members: Array<string>, moderators: Array<string>, keywords: Array<string>, metadata?: Dictionary<any>, threadId?: boolean | string) => Promise<any | ErrorType>;
    createPrivate: (signerAddress: string, token: string, title: string, description: string, url: string, members: Array<string>, moderators: Array<string>, keywords: Array<string>, metadata?: Dictionary<any>, threadId?: boolean | string) => Promise<any | ErrorType>;
    delete: (signerAddress: string, token: string, threadId: string) => Promise<any | ErrorType>;
    query: (query: ThreadsQueryType) => Promise<any | ErrorType>;
    multiQuery: (queries: Array<ThreadsQueryType>) => Promise<any | ErrorType>;
    getThread: (threadId: string) => Promise<any | ErrorType>;
    getThreads: (threadIds: Array<string>) => Promise<any | ErrorType>;
    getUserThreads: (signerAddress: string) => Promise<any | ErrorType>;
    addMembers: (signerAddress: string, token: string, threadId: string, members: Array<string>) => Promise<any | ErrorType>;
    removeMembers: (signerAddress: string, token: string, threadId: string, members: Array<string>) => Promise<any | ErrorType>;
    addModerators: (signerAddress: string, token: string, threadId: string, moderators: Array<string>) => Promise<any | ErrorType>;
    removeModerators: (signerAddress: string, token: string, threadId: string, moderators: Array<string>) => Promise<any | ErrorType>;
    updateTitle: (signerAddress: string, token: string, threadId: string, title: string) => Promise<any | ErrorType>;
    updateDescription: (signerAddress: string, token: string, threadId: string, description: string) => Promise<any | ErrorType>;
    togglePublicRead: (signerAddress: string, token: string, threadId: string) => Promise<any | ErrorType>;
    togglePublicWrite: (signerAddress: string, token: string, threadId: string) => Promise<any | ErrorType>;
    subscribe: (threadId: string, callbackOnMessage: any) => (import("ably").Types.RealtimePromise | import("ably").Types.RealtimeChannelPromise)[];
}
export default Threads;
