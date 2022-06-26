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
function getDebankData(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const json = (yield (0, utils_1.fetcher)('GET', `https://api.debank.com/social_ranking?id=${address}`));
        if ('base_score' in json) {
            return {
                base_score: json.data.base_score,
                rank: json.data.rank,
                social_coefficient: json.data.social_coefficient,
                social_score: json.data.social_score,
                total_score: json.data.total_score,
            };
        }
        else {
            return {};
        }
        return json.data;
    });
}
exports.default = getDebankData;
