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
function getBoardroomData(address) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const data = (yield (0, utils_1.fetcher)('GET', `https://api.boardroom.info/v1/voters/${address}/votes`));
        let totalVotes = 0;
        const daos = [];
        const votes = [];
        for (let index = 0; index < data['data'].length; index++) {
            const doc = data['data'][index];
            if (((_a = doc === null || doc === void 0 ? void 0 : doc.proposalInfo) === null || _a === void 0 ? void 0 : _a.currentState) === 'executed') {
                totalVotes += 1;
                if (daos.includes(doc.protocol) === false) {
                    daos.push(doc.protocol);
                }
                votes.push({
                    dao: doc.protocol,
                    vote: doc.proposalInfo.choices[doc.choice],
                    proposalLink: `https://app.boardroom.info/compound/proposal/${doc.proposalRefId}`,
                });
            }
        }
        return {
            totalVotes,
            daos,
            votes,
        };
    });
}
exports.default = getBoardroomData;
