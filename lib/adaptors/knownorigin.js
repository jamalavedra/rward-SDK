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
function getKnownOriginData(address, computeConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Boolean(computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.etherumPriceInUsd) === false) {
            throw new Error('getKnownOriginData: computeConfig does not contain etherumPriceInUsd');
        }
        const jsonData = (yield (0, utils_2.gqlFetcher)('https://api.thegraph.com/subgraphs/name/knownorigin/known-origin', `
        {
            editions(orderBy: "createdTimestamp", orderDirection: "desc", where: {collaborators_contains: ["${address.toLowerCase()}"], active: true, remainingSupply_lte: 10000, remainingSupply_gte: 0}) {
                id
                version
                salesType
                startDate
                artistAccount
                totalSupply
                totalAvailable
                totalSold
                priceInWei
                remainingSupply
                optionalCommissionAccount
                offersOnly
                startDate
                stepSaleStepPrice
                totalEthSpentOnEdition
                metadata {
                    id
                    name
                    image
                    artist
                    image_type
                    image_sphere
                    __typename
                }
                reservePrice
                reserveAuctionBid
                reserveAuctionStartDate
                previousReserveAuctionEndTimestamp
                reserveAuctionEndTimestamp
                __typename
            }
        }
    `));
        const artworks = jsonData['data']['editions'];
        let totalAmountSold = 0;
        for (let index = 0; index < artworks.length; index++) {
            const artwork = artworks[index];
            if (parseInt(artwork['totalSold']) >= 1) {
                totalAmountSold +=
                    parseFloat((0, utils_1.formatEther)(artwork['priceInWei'])) *
                        computeConfig.etherumPriceInUsd;
            }
        }
        return {
            totalCountSold: artworks.length,
            totalAmountSold,
        };
    });
}
exports.default = getKnownOriginData;
