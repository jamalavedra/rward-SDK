import { CommentsQueryType, Dictionary, ErrorType } from './types';
declare class Comments {
    apikey: string;
    node: string;
    constructor(apikey: string, node: string);
    create: (signerAddress: string, token: string, comment: string, threadId: string, url: string, metadata?: Dictionary<any>, replyTo?: string | undefined, tag1?: string | undefined, tag2?: string | undefined) => Promise<any | ErrorType>;
    delete: (signerAddress: string, token: string, commentId: string) => Promise<any | ErrorType>;
    query: (query: CommentsQueryType) => Promise<any | ErrorType>;
    getComment: (commentId: string) => Promise<any | ErrorType>;
    multiQuery: (queries: Array<CommentsQueryType>) => Promise<any | ErrorType>;
    toggleUpvote: (signerAddress: string, token: string, commentId: string) => Promise<any | ErrorType>;
    toggleDownvote: (signerAddress: string, token: string, commentId: string) => Promise<any | ErrorType>;
}
export default Comments;
