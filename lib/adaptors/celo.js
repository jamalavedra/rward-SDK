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
function getCeloData(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = (yield (0, utils_1.gqlFetcher)('https://api.thegraph.com/subgraphs/id/QmWDxPtNrngVfeMjXCCKvWVuof7DbJQv1thAbnz4MDV6Xc', `{
          attestationsCompleteds (where: {id: "${address.toLowerCase()}"}) {
              id
              count
          }
      }`));
            if (response['data']['attestationsCompleteds'].length > 0) {
                return {
                    attestations: response['data']['attestationsCompleteds'][0]['count'],
                };
            }
            else {
                return {
                    attestations: 0,
                };
            }
        }
        catch (error) {
            return {
                attestations: 0,
            };
        }
    });
}
exports.default = getCeloData;
