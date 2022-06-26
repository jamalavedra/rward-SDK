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
function getZapperData(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonData = (yield (0, utils_1.fetcher)('GET', `https://api.zapper.fi/v1/gamification/users/${address.toLowerCase()}?api_key=96e0cc51-a62e-42ca-acee-910ea7d2a241`));
        return {
            followers: jsonData === null || jsonData === void 0 ? void 0 : jsonData.followerCount,
            following: jsonData === null || jsonData === void 0 ? void 0 : jsonData.followedCount,
            xp: jsonData === null || jsonData === void 0 ? void 0 : jsonData.address,
            zp: jsonData === null || jsonData === void 0 ? void 0 : jsonData.zp,
        };
    });
}
exports.default = getZapperData;
