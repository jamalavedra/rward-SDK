import Comments from './comments';
import Auth from './auth';
import ConvoBase from './base';
import Threads from './threads';
import Omnid from './omnid';
declare class Convo extends ConvoBase {
    comments: Comments;
    auth: Auth;
    threads: Threads;
    omnid: Omnid;
    constructor(apikey: string, node?: string);
}
export { Convo };
