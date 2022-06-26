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
function getPopData(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = (yield (0, utils_1.gqlFetcher)('https://api.thegraph.com/subgraphs/id/QmewtAtJJsTDAeT8apSXtK3mi4PaHFqMwz1JjqinrVozPg', `{
        passports(where: {id: "${address.toLowerCase()}"}) {
          id
          tokenURI
        }
      }`));
            if (response['data']['passports'].length > 0) {
                const passData = (yield (0, utils_1.fetcher)('GET', response['data']['passports'][0].tokenURI));
                // eslint-disable-next-line prefer-const
                let retResp = {};
                for (let index = 0; index < passData.attributes.length; index++) {
                    const attr = passData.attributes[index];
                    retResp[attr.trait_type] = parseFloat(attr.value);
                }
                return retResp;
            }
            else {
                return {};
            }
        }
        catch (error) {
            return {};
        }
    });
}
exports.default = getPopData;
