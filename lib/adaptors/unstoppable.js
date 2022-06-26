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
const utils_1 = require("../utils");
function resolveUnstoppableDomains(address) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const queryResult = (yield (0, utils_1.gqlFetcher)('https://api.thegraph.com/subgraphs/name/unstoppable-domains-integrations/dot-crypto-registry', `
        {
            domains(where: {owner: "${address === null || address === void 0 ? void 0 : address.toLowerCase()}"}) {
                name
                resolver {
                    records (where :{key:"crypto.ETH.address"}) {
                        key
                        value
                    }
                }
            }
        }
    `));
        if (Boolean((_a = queryResult.data.domains) === null || _a === void 0 ? void 0 : _a.length) === true &&
            queryResult.data.domains.length > 0) {
            for (let index = 0; index < queryResult.data.domains.length; index++) {
                const domain = queryResult.data.domains[index];
                if (domain.name.split('.').length === 2 &&
                    ((_b = domain.resolver) === null || _b === void 0 ? void 0 : _b.records.length) > 0) {
                    for (let i = 0; i < domain.resolver.records.length; i++) {
                        if (((_c = domain.resolver.records[i].value) === null || _c === void 0 ? void 0 : _c.toLowerCase()) ===
                            address.toLowerCase()) {
                            return domain.name;
                        }
                    }
                }
            }
            return false;
        }
        else {
            return false;
        }
    });
}
exports.default = resolveUnstoppableDomains;
