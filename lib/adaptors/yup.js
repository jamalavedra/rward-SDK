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
function getYupData(address, computeConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Boolean(computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.CNVSEC_ID) === false) {
            throw new Error('getYupData: computeConfig does not contain CNVSEC_ID');
        }
        const json = yield (0, utils_1.fetcher)('GET', `https://cnvsec.vercel.app/api/yup?id=${computeConfig.CNVSEC_ID}&address=${address}`);
        return json;
    });
}
exports.default = getYupData;
