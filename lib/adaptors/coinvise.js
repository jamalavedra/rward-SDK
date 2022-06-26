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
// interface SendsResult {
//   data: Array<{
//     senderAddr: string;
//     type: string;
//     user_addr: string;
//   }>;
// }
function getCoinviseData(address, computeConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        function getPoolData(tokenAddress) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = (yield (0, utils_1.gqlFetcher)('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', `{
        pools (where : {token0: "${tokenAddress.toLowerCase()}"}) {
          id
          totalValueLockedUSD
          token0 {
            id
          }
          token1 {
            id
          }
        }
      }`));
                return response['data']['pools'];
            });
        }
        try {
            if (Boolean(computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.maticPriceInUsd) === false) {
                throw new Error('getCoinviseData: computeConfig does not contain maticPriceInUsd');
            }
            const promiseArray = [
                (0, utils_1.fetcher)('GET', `https://coinvise-prod.herokuapp.com/token?userAddress=${address}&production=true`),
                // fetcher(
                //   'GET',
                //   `https://www.coinvise.co/api/nft?chain=137&address=${address}`
                // ),
                (0, utils_1.fetcher)('GET', `https://coinvise-prod.herokuapp.com/user?slug=${address}`),
                // fetcher('GET', 'https://coinvise-prod.herokuapp.com/sends?size=1000'),
            ];
            const data = yield Promise.allSettled(promiseArray);
            // 0 - social tokens
            let totalPoolCount = 0;
            let totalPoolTvl = 0;
            let totalTokens = 0;
            if (data[0].status === 'fulfilled') {
                const tokenData = data[0];
                totalTokens = tokenData.value.length;
                const promiseArray2 = [];
                if (tokenData.value.length > 0) {
                    for (let index = 0; index < tokenData.value.length; index++) {
                        promiseArray2.push(getPoolData(tokenData.value[index].address));
                    }
                }
                const resp = yield Promise.allSettled(promiseArray2);
                for (let index = 0; index < resp.length; index++) {
                    if (resp[index].status === 'fulfilled') {
                        const poolDatas = resp[index];
                        for (let ind = 0; ind < poolDatas.value.length; ind++) {
                            const poolData = poolDatas.value[ind];
                            totalPoolCount += 1;
                            totalPoolTvl += parseFloat(poolData.totalValueLockedUSD);
                        }
                    }
                }
            }
            //  nfts
            const totalCountNft = 0;
            const totalCountSold = 0;
            const totalAmountSold = 0;
            // if (data[1].status === 'fulfilled') {
            //   const nfts = data[1] as PromiseFulfilledResult<NftResult>;
            //   if (Object.keys(nfts.value).includes('error') === false) {
            //     totalCountNft = nfts.value.nfts.length;
            //     for (let index = 0; index < nfts.value.nfts.length; index++) {
            //       const nft = nfts.value.nfts[index];
            //       if (nft.sold === true) {
            //         totalCountSold += 1;
            //         if (nft.symbol === 'MATIC') {
            //           totalAmountSold +=
            //             parseFloat(nft.price) * computeConfig.maticPriceInUsd;
            //         }
            //         if (nft.symbol === 'USDC') {
            //           totalAmountSold += parseFloat(nft.price);
            //         }
            //       }
            //     }
            //   }
            // }
            // 1 - user
            let followers = 0;
            let following = 0;
            if (data[2].status === 'fulfilled') {
                const userData = data[2];
                if (Object.keys(userData.value).includes('code') === false) {
                    followers = userData.value.user.followers;
                    following = userData.value.user.following;
                }
            }
            // 3 - sends
            // const multisendCount = 0;
            // const airdropCount = 0;
            // if (data[2].status === 'fulfilled') {
            //   const sendsData = data[2] as PromiseFulfilledResult<SendsResult>;
            //   for (let index = 0; index < sendsData.value.data.length; index++) {
            //     const item = sendsData.value.data[index];
            //     if (item.type === 'multisend' && item.senderAddr === address) {
            //       multisendCount += 1;
            //     } else if (item.type === 'airdrop' && item.user_addr === address) {
            //       airdropCount += 1;
            //     }
            //   }
            // }
            return {
                tokensCreated: totalTokens,
                nftsCreated: totalCountNft,
                totalPoolCount,
                totalPoolTvl,
                totalCountSold,
                totalAmountSold,
                multisendCount: 0,
                airdropCount: 0,
                following,
                followers,
            };
        }
        catch (error) {
            return {
                tokensCreated: 0,
                nftsCreated: 0,
                totalPoolCount: 0,
                totalPoolTvl: 0,
                totalCountSold: 0,
                totalAmountSold: 0,
                multisendCount: 0,
                airdropCount: 0,
                following: 0,
                followers: 0,
            };
        }
    });
}
exports.default = getCoinviseData;
