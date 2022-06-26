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
function getRaribleData(address, computeConfig) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (Boolean(computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.etherumPriceInUsd) === false) {
            throw new Error('getRaribleData: computeConfig does not contain etherumPriceInUsd');
        }
        const promiseArray = [
            (0, utils_1.fetcher)('POST', 'https://api-mainnet.rarible.com/marketplace/api/v4/items', '', {
                filter: {
                    '@type': 'by_creator',
                    creator: address,
                },
            }),
            (0, utils_1.fetcher)('GET', `https://api-mainnet.rarible.com/marketplace/api/v4/profiles/${address}/meta`),
        ];
        const resp = yield Promise.allSettled(promiseArray);
        let artworks = [];
        if (resp[0].status === 'fulfilled') {
            const tempRes = resp[0];
            artworks = tempRes.value;
        }
        let metadata = {
            followings: 0,
            followers: 0,
            blacklisted: false,
            shortUrl: '',
        };
        if (resp[1].status === 'fulfilled') {
            const tempRes = resp[1];
            metadata = tempRes.value;
        }
        let totalCountSold = artworks.length;
        let totalAmountSold = 0;
        for (let index = 0; index < artworks.length; index++) {
            if (((_a = artworks[index]['ownership']) === null || _a === void 0 ? void 0 : _a.status) === 'FIXED_PRICE') {
                totalAmountSold +=
                    artworks[index]['ownership']['priceEth'] *
                        computeConfig.etherumPriceInUsd;
            }
            else {
                totalCountSold -= 1;
            }
        }
        return Object.assign({ totalCountSold,
            totalAmountSold }, metadata);
    });
}
exports.default = getRaribleData;
