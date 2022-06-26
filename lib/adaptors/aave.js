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
const ethers_1 = require("ethers");
function getAaveData(address, computeConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Boolean(computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.etherumMainnetRpc) === false) {
            throw new Error('getAaveData: computeConfig does not contain etherumMainnetRpc');
        }
        if (Boolean(computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.polygonMainnetRpc) === false) {
            throw new Error('getAaveData: computeConfig does not contain polygonMainnetRpc');
        }
        if (Boolean(computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.avalancheMainnetRpc) === false) {
            throw new Error('getAaveData: computeConfig does not contain avalancheMainnetRpc');
        }
        const providerEth = new ethers_1.ethers.providers.JsonRpcProvider({
            allowGzip: true,
            url: computeConfig.etherumMainnetRpc,
        });
        const providerMatic = new ethers_1.ethers.providers.JsonRpcProvider({
            allowGzip: true,
            url: computeConfig.polygonMainnetRpc,
        });
        const providerAvalanche = new ethers_1.ethers.providers.JsonRpcProvider({
            allowGzip: true,
            url: computeConfig.avalancheMainnetRpc,
        });
        const lendingPoolAbi = [
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'user',
                        type: 'address',
                    },
                ],
                name: 'getUserAccountData',
                outputs: [
                    {
                        internalType: 'uint256',
                        name: 'totalCollateralETH',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'totalDebtETH',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'availableBorrowsETH',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'currentLiquidationThreshold',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'ltv',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'healthFactor',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
        ];
        const mainMarketAddress = new ethers_1.ethers.Contract('0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9', lendingPoolAbi, providerEth);
        const ammMarketAddress = new ethers_1.ethers.Contract('0x7937d4799803fbbe595ed57278bc4ca21f3bffcb', lendingPoolAbi, providerEth);
        const polygonMarketAddress = new ethers_1.ethers.Contract('0x8dff5e27ea6b7ac08ebfdf9eb090f32ee9a30fcf', lendingPoolAbi, providerMatic);
        const avalancheMarketAddress = new ethers_1.ethers.Contract('0x4F01AeD16D97E3aB5ab2B501154DC9bb0F1A5A2C', lendingPoolAbi, providerAvalanche);
        const promiseArray = [
            mainMarketAddress.getUserAccountData(address),
            ammMarketAddress.getUserAccountData(address),
            polygonMarketAddress.getUserAccountData(address),
            avalancheMarketAddress.getUserAccountData(address),
        ];
        const resp = yield Promise.allSettled(promiseArray);
        let totalHf = 0;
        const data = [];
        for (let index = 0; index < resp.length; index++) {
            if (resp[index].status === 'fulfilled') {
                const poolDataResp = resp[index];
                const poolData = poolDataResp.value;
                const hf = parseInt(poolData.healthFactor.toString()) / Math.pow(10, 18);
                const isValidHf = hf < 10000 ? true : false;
                if (isValidHf === true) {
                    totalHf += hf;
                    data.push({
                        totalCollateralETH: ethers_1.ethers.utils.formatEther(poolData.totalCollateralETH),
                        totalDebtETH: ethers_1.ethers.utils.formatEther(poolData.totalDebtETH),
                        availableBorrowsETH: ethers_1.ethers.utils.formatEther(poolData.availableBorrowsETH),
                        currentLiquidationThreshold: ethers_1.ethers.utils.formatEther(poolData.currentLiquidationThreshold),
                        ltv: ethers_1.ethers.utils.formatEther(poolData.ltv),
                        healthFactor: hf,
                    });
                }
                else {
                    data.push({
                        healthFactor: false,
                    });
                }
            }
            else {
                const poolDataResp = resp[index];
                console.log('getAaveData.error', poolDataResp.reason);
                data.push({
                    totalCollateralETH: 0,
                    totalDebtETH: 0,
                    availableBorrowsETH: 0,
                    currentLiquidationThreshold: 0,
                    ltv: 0,
                    healthFactor: 0,
                });
            }
        }
        return {
            totalHf: totalHf,
            mainMarket: data[0],
            ammMarket: data[1],
            polygonMarket: data[2],
            avalancheMarket: data[3],
        };
    });
}
exports.default = getAaveData;
