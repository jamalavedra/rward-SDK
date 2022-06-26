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
function getAsyncartData(address, computeConfig) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (Boolean(computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.etherumPriceInUsd) === false) {
            throw new Error('getAsyncartData: computeConfig does not contain etherumPriceInUsd');
        }
        try {
            const response = (yield (0, utils_1.fetcher)('GET', 'https://async-app.com/users/' +
                address.toLowerCase() +
                '/arts?page=1&count=1000&rel=owner&type=masters'));
            const artworks = response['arts'];
            // console.log(artworks);
            let totalCountSold = artworks.length;
            let totalAmountSold = 0;
            for (let index = 0; index < artworks.length; index++) {
                if (Boolean((_a = artworks[index]['lastSale']) === null || _a === void 0 ? void 0 : _a.buyer) === true) {
                    totalAmountSold += artworks[index]['lastSale']['sale']['amount'];
                }
                else if (artworks[index]['auction'].hasReserve === true &&
                    Boolean((_b = artworks[index]['auction']) === null || _b === void 0 ? void 0 : _b.endTime) === true) {
                    totalAmountSold += artworks[index]['auction']['reservePrice'];
                }
                else {
                    totalCountSold -= 1;
                }
            }
            return {
                totalCountSold,
                totalAmountSold: totalAmountSold * computeConfig.etherumPriceInUsd,
            };
        }
        catch (error) {
            return {
                totalCountSold: 0,
                totalAmountSold: 0,
            };
        }
    });
}
exports.default = getAsyncartData;
