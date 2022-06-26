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
function addressToEns(address) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const resp = (yield (0, utils_1.gqlFetcher)('https://api.thegraph.com/subgraphs/name/ensdomains/ens', `
    {
        domains (where: {resolvedAddress: "${address.toLowerCase()}"}){
            name
        }
    }
    `));
        if (Boolean(resp.data) === true && ((_a = resp.data) === null || _a === void 0 ? void 0 : _a.domains.length) === 0) {
            return false;
        }
        else {
            let finalDomain = false;
            for (let index = 0; index < resp['data']['domains'].length; index++) {
                const domain = resp['data']['domains'][index];
                if (domain.name.split('.').length == 2) {
                    finalDomain = domain.name;
                }
            }
            return finalDomain;
        }
    });
}
exports.default = addressToEns;
