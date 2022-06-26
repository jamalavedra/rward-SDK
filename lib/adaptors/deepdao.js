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
function getDeepDaoData(address) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        const json = (yield (0, utils_1.fetcher)('GET', `https://api.deepdao.io/v0.1/people/participation_score/${address.toLowerCase()}`, '', {}, {
            'x-api-key': 'mAWyZ3pG2m8tGnrNgRrEw4b0UheQYE9d5yWGEK0H',
        }));
        if ('message' in json) {
            return {};
        }
        else {
            return {
                score: (_a = json.data) === null || _a === void 0 ? void 0 : _a.score,
                rank: (_b = json.data) === null || _b === void 0 ? void 0 : _b.rank,
                relativeScore: (_c = json.data) === null || _c === void 0 ? void 0 : _c.relativeScore,
                daos: (_d = json.data) === null || _d === void 0 ? void 0 : _d.daos,
                proposals: (_e = json.data) === null || _e === void 0 ? void 0 : _e.proposals,
                votes: (_f = json.data) === null || _f === void 0 ? void 0 : _f.votes,
            };
        }
    });
}
exports.default = getDeepDaoData;
