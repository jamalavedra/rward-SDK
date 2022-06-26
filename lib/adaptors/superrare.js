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
// interface SuperrareResult2 {
//   status: string;
//   result: {
//     followers: {
//       totalCount: number;
//     };
//     following: {
//       totalCount: number;
//     };
//   };
// }
function getSuperrareData(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jsonData = (yield (0, utils_1.fetcher)('POST', 'https://superrare.com/api/v2/nft/get-by-market-details', '', {
                contractAddresses: [
                    '0x41a322b28d0ff354040e2cbc676f0320d8c8850d',
                    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0',
                ],
                hasBidWithAuctionAddressses: null,
                ownedByCreator: false,
                creatorAddress: address.toLowerCase(),
                includeBurned: false,
                orderBy: 'TOKEN_ID_DESC',
                hasSold: true,
            }));
            const artworks = jsonData['result']['collectibles'];
            // let followers = 0;
            // let following = 0;
            // let username = null;
            // if (artworks.length > 0) {
            //   username = artworks[0].creator.username;
            //   const metadata = (await fetcher(
            //     'GET',
            //     `https://superrare.com/api/v2/user?username=${username}`
            //   )) as SuperrareResult2;
            //   followers = metadata.result.followers.totalCount;
            //   following = metadata.result.following.totalCount;
            // }
            const totalCountSold = jsonData['result']['totalCount'];
            const totalCreated = artworks.length;
            let totalAmountSold = 0;
            for (let index = 0; index < artworks.length; index++) {
                const amtData = artworks[index]['nftEvents']['nodes'][0];
                if (Boolean(amtData === null || amtData === void 0 ? void 0 : amtData.sale) === true) {
                    totalAmountSold += amtData['sale']['usdAmount'];
                }
                else if (Boolean(amtData === null || amtData === void 0 ? void 0 : amtData.auctionSettled) === true) {
                    totalAmountSold += amtData['auctionSettled']['usdAmount'];
                }
                else if (Boolean(amtData === null || amtData === void 0 ? void 0 : amtData.acceptBid) === true) {
                    totalAmountSold += amtData['acceptBid']['usdAmount'];
                }
            }
            return {
                // username,
                // followers,
                // following,
                totalCreated,
                totalCountSold,
                totalAmountSold,
            };
        }
        catch (error) {
            return {};
        }
    });
}
exports.default = getSuperrareData;
