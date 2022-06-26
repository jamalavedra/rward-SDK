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
function getAge(address, computeConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Boolean(computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.etherscanApiKey) === false) {
            throw new Error('getAaveData: computeConfig does not contain etherscanApiKey');
        }
        if (Boolean(computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.polygonscanApiKey) === false) {
            throw new Error('getAaveData: computeConfig does not contain polygonscanApiKey');
        }
        const promiseArray = [
            (0, utils_1.fetcher)('GET', `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${computeConfig.etherscanApiKey}`),
            (0, utils_1.fetcher)('GET', `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${computeConfig.polygonscanApiKey}`),
        ];
        const data = yield Promise.allSettled(promiseArray);
        const now = new Date();
        let ethereumAge = 0;
        let polygonAge = 0;
        if (data[0].status === 'fulfilled') {
            const respData = data[0].value;
            if (Boolean(respData === null || respData === void 0 ? void 0 : respData.result) === true && respData.result.length > 0) {
                const past = new Date(parseInt(respData.result[0].timeStamp) * 1000);
                const days = Math.floor((now.getTime() - past.getTime()) / (1000 * 3600 * 24));
                ethereumAge = days;
            }
            else {
                ethereumAge = 0;
            }
        }
        if (data[1].status === 'fulfilled') {
            const respData2 = data[1].value;
            if (Boolean(respData2 === null || respData2 === void 0 ? void 0 : respData2.result) === true && respData2.result.length > 0) {
                const past = new Date(parseInt(respData2.result[0].timeStamp) * 1000);
                const days2 = Math.floor((now.getTime() - past.getTime()) / (1000 * 3600 * 24));
                polygonAge = days2;
            }
            else {
                polygonAge = 0;
            }
        }
        return {
            polygon: polygonAge,
            ethereum: ethereumAge,
        };
    });
}
exports.default = getAge;
