"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class Comments {
    constructor(apikey, node) {
        this.create = (signerAddress, token, comment, threadId, url, metadata = {}, replyTo, tag1, tag2) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, utils_1.fetcher)('POST', `${this.node}/comments`, this.apikey, {
                token,
                signerAddress,
                comment,
                threadId,
                url: decodeURIComponent(url),
                metadata,
                replyTo,
                tag1,
                tag2,
            });
        });
        this.delete = (signerAddress, token, commentId) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, utils_1.fetcher)('DELETE', `${this.node}/comments`, this.apikey, {
                token,
                signerAddress,
                commentId,
            });
        });
        this.query = (query) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, utils_1.fetcher)('GET', `${this.node}/comments?${(0, utils_1.encodeQuery)(query)}`, this.apikey, {});
        });
        this.getComment = (commentId) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, utils_1.fetcher)('GET', `${this.node}/comment?commentId=${commentId}`, this.apikey, {});
        });
        this.multiQuery = (queries) => __awaiter(this, void 0, void 0, function* () {
            return yield Promise.allSettled(queries.map((q) => {
                return this.query(q);
            }));
        });
        this.toggleUpvote = (signerAddress, token, commentId) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, utils_1.fetcher)('POST', `${this.node}/vote`, this.apikey, {
                token,
                signerAddress,
                type: 'toggleupvote',
                commentId,
            });
        });
        this.toggleDownvote = (signerAddress, token, commentId) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, utils_1.fetcher)('POST', `${this.node}/vote`, this.apikey, {
                token,
                signerAddress,
                type: 'toggledownvote',
                commentId,
            });
        });
        this.apikey = apikey;
        this.node = node;
        return this;
    }
}
exports.default = Comments;
