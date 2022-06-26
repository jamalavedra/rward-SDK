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
const utils_1 = require("ethers/lib/utils");
const utils_2 = require("../utils");
function getZoraData(address, computeConfig) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (Boolean(computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.etherumPriceInUsd) === false) {
            throw new Error('getZoraData: computeConfig does not contain etherumPriceInUsd');
        }
        const data = (yield (0, utils_2.gqlFetcher)('https://indexer-prod-mainnet.zora.co/v1/graphql', `query Tokens {
        Token(limit: 10000, where:{minter:{_eq:"${address.toLowerCase()}"}}){
          minter
          owner
          auctions{
            winner
            lastBidAmount
          }
        }
      }`));
        const artworks = (_a = data.data) === null || _a === void 0 ? void 0 : _a.Token;
        let totalCountSold = 0;
        let totalAmountSold = 0;
        for (let index = 0; index < artworks.length; index++) {
            // console.log(artworks[index]['ownership']);
            if (artworks[index]['auctions'].length > 0 &&
                artworks[index]['owner'] ===
                    artworks[index]['auctions'][artworks[index]['auctions'].length - 1]['winner']) {
                totalCountSold += 1;
                totalAmountSold +=
                    parseFloat((0, utils_1.formatEther)(artworks[index]['auctions'][artworks[index]['auctions'].length - 1]['lastBidAmount'])) * computeConfig.etherumPriceInUsd;
            }
        }
        return {
            totalCountSold,
            totalAmountSold,
        };
    });
}
exports.default = getZoraData;
