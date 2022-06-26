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
const cross_fetch_1 = __importDefault(require("cross-fetch"));
class ConvoBase {
  constructor(apikey, node) {
    this.logConfig = () =>
      __awaiter(this, void 0, void 0, function* () {
        const pingResult = yield this.ping();
        const versionInfo = yield (0, cross_fetch_1.default)(
          "https://bundlephobia.com/api/size?package=@rward.xyz/sdk@latest&record=true"
        ).then((r) => {
          return r.json();
        });
        return {
          node: this.node,
          apikey: this.apikey,
          currentVersion: "0.3.34",
          latestVersion: versionInfo["version"],
          pingResult: pingResult,
        };
      });
    this.ping = () =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("GET", `${this.node}/ping`, this.apikey, {});
      });
    this.apikey = apikey;
    this.node = node;
    return this;
  }
  getApiKey() {
    return this.apikey;
  }
}
exports.default = ConvoBase;
