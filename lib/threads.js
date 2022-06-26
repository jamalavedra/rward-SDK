"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const promises_1 = __importDefault(require("ably/promises"));
const react_1 = require("react");
class Threads {
  constructor(apikey, node) {
    this.create = (
      signerAddress,
      token,
      title,
      description,
      url,
      isReadPublic,
      isWritePublic,
      members,
      moderators,
      keywords,
      metadata = {},
      threadId = false
    ) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("POST", `${this.node}/threads`, this.apikey, {
          signerAddress,
          token,
          action: "create",
          title: encodeURIComponent(title),
          description: encodeURIComponent(description),
          url: encodeURIComponent(url),
          isReadPublic,
          isWritePublic,
          members,
          moderators,
          keywords,
          metadata,
          threadId,
        });
      });
    this.createPrivate = (
      signerAddress,
      token,
      title,
      description,
      url,
      members,
      moderators,
      keywords,
      metadata = {},
      threadId = false
    ) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield this.create(
          signerAddress,
          token,
          title,
          description,
          url,
          false,
          false,
          members,
          moderators,
          keywords,
          metadata,
          threadId
        );
      });
    this.delete = (signerAddress, token, threadId) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("DELETE", `${this.node}/threads`, this.apikey, {
          token,
          signerAddress,
          threadId,
        });
      });
    this.query = (query) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("GET", `${this.node}/threads?${(0, utils_1.encodeQuery)(query)}`, this.apikey, {});
      });
    this.multiQuery = (queries) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield Promise.allSettled(
          queries.map((q) => {
            return this.query(q);
          })
        );
      });
    this.getThread = (threadId) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("GET", `${this.node}/threads/${threadId}`, this.apikey);
      });
    this.getThreads = (threadIds) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("GET", `${this.node}/threads/${threadIds.toString()}`, this.apikey);
      });
    this.getUserThreads = (signerAddress) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("GET", `${this.node}/threads/user/${signerAddress}`, this.apikey);
      });
    this.addMembers = (signerAddress, token, threadId, members) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("POST", `${this.node}/threads`, this.apikey, {
          token,
          signerAddress,
          action: "addMembers",
          threadId,
          members,
        });
      });
    this.removeMembers = (signerAddress, token, threadId, members) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("POST", `${this.node}/threads`, this.apikey, {
          token,
          signerAddress,
          action: "removeMembers",
          threadId,
          members,
        });
      });
    this.addModerators = (signerAddress, token, threadId, moderators) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("POST", `${this.node}/threads`, this.apikey, {
          token,
          signerAddress,
          action: "addModerators",
          threadId,
          moderators,
        });
      });
    this.removeModerators = (signerAddress, token, threadId, moderators) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("POST", `${this.node}/threads`, this.apikey, {
          token,
          signerAddress,
          action: "removeModerators",
          threadId,
          moderators,
        });
      });
    this.updateTitle = (signerAddress, token, threadId, title) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("POST", `${this.node}/threads`, this.apikey, {
          token,
          signerAddress,
          action: "updateTitle",
          threadId,
          title,
        });
      });
    this.updateDescription = (signerAddress, token, threadId, description) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("POST", `${this.node}/threads`, this.apikey, {
          token,
          signerAddress,
          action: "updateDescription",
          threadId,
          description,
        });
      });
    this.togglePublicRead = (signerAddress, token, threadId) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("POST", `${this.node}/threads`, this.apikey, {
          token,
          signerAddress,
          action: "togglePublicRead",
          threadId,
        });
      });
    this.togglePublicWrite = (signerAddress, token, threadId) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("POST", `${this.node}/threads`, this.apikey, {
          token,
          signerAddress,
          action: "togglePublicWrite",
          threadId,
        });
      });
    this.subscribe = (threadId, callbackOnMessage) => {
      const ably = new promises_1.default.Realtime.Promise({
        authUrl: `https://rward.xyz/api/getAblyAuth?apikey=${this.apikey}`,
      });
      const channel = ably.channels.get(threadId);
      const onMount = () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        void channel.subscribe(callbackOnMessage);
      };
      const onUnmount = () => {
        channel.unsubscribe();
      };
      const useEffectHook = () => {
        onMount();
        return () => {
          onUnmount();
        };
      };
      (0, react_1.useEffect)(useEffectHook);
      return [channel, ably];
    };
    this.apikey = apikey;
    this.node = node;
    return this;
  }
}
exports.default = Threads;
