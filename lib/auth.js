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
Object.defineProperty(exports, "__esModule", { value: true });
const siwe_1 = require("siwe");
const utils_1 = require("./utils");
class Auth {
  constructor(apikey, node) {
    this.validate = (signerAddress, token) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("POST", `${this.node}/validateAuth`, this.apikey, {
          signerAddress,
          token,
        });
      });
    this.authenticate = (
      signerAddress,
      signature,
      timestamp,
      chain,
      accountId = ""
    ) =>
      __awaiter(this, void 0, void 0, function* () {
        const ep = `${this.node}/auth`;
        if (chain === "ethereum") {
          return yield (0, utils_1.fetcher)("POST", ep, this.apikey, {
            signerAddress,
            signature,
            timestamp,
            chain: "ethereum",
          });
        } else if (chain === "near") {
          return yield (0, utils_1.fetcher)("POST", ep, this.apikey, {
            signerAddress,
            signature,
            accountId,
            timestamp,
            chain: "near",
          });
        } else if (chain === "flow") {
          return yield (0, utils_1.fetcher)("POST", ep, this.apikey, {
            signerAddress,
            signature,
            timestamp,
            chain: "flow",
          });
        } else if (chain === "solana") {
          return yield (0, utils_1.fetcher)("POST", ep, this.apikey, {
            signerAddress,
            signature,
            timestamp,
            chain: "solana",
          });
        } else {
          const error = "Invalid Chain Name";
          console.error(error);
          return { error };
        }
      });
    this.authenticateV2 = (message, signature) =>
      __awaiter(this, void 0, void 0, function* () {
        return yield (0,
        utils_1.fetcher)("POST", `${this.node}/authV2`, this.apikey, {
          message,
          signature,
          chain: "ethereum",
        });
      });
    this.apikey = apikey;
    this.node = node;
    return this;
  }
  getSignatureData(signerAddress, timestamp) {
    return `I allow this site to access my data on The Convo Space using the account ${signerAddress}. Timestamp:${timestamp}`;
  }
  getSignatureDataV2(uri, signerAddress, chainId, resources = []) {
    const domains = uri.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
    const now = new Date();
    const tom = now;
    tom.setDate(now.getDate() + 1);
    resources.push("https://rward.xyz/privacy-policy");
    const message = new siwe_1.SiweMessage({
      domain: domains[1],
      address: signerAddress,
      chainId: chainId,
      uri: uri,
      version: "1",
      statement: "I allow this site to access my data on The Convo Space.",
      nonce: (0, siwe_1.generateNonce)(),
      issuedAt: now.toISOString(),
      expirationTime: tom.toISOString(),
      resources: resources,
    });
    return message.prepareMessage();
  }
  parseSignatureV2(message) {
    return new siwe_1.SiweMessage(message);
  }
}
exports.default = Auth;
