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
function getQuestbookData(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonData = (yield (0, utils_1.gqlFetcher)('https://the-graph.questbook.app/subgraphs/name/qb-subgraph-polygon', `query {
        grants(
            subgraphError: allow
            where: {creatorId: "${address.toLowerCase()}"}
            orderBy: createdAtS
            orderDirection: desc
        ) {
            id
            creatorId
            title
            createdAtS
            summary
            details
            reward {
                committed
                id
                asset
            }
            workspace {
                id
                title
                logoIpfsHash
                supportedNetworks
            }
            deadline
            funding
            numberOfApplications
        }
        grantApplications(
            subgraphError: allow
            where: {applicantId: "${address.toLowerCase()}"}
            orderBy: createdAtS
            orderDirection: desc
        ) {
            id
            createdAtS
            state
        }
    }`));
        let grantApplications = 0;
        let grants = 0;
        for (let index = 0; index < jsonData['data']['grantApplications'].length; index++) {
            const app = jsonData['data']['grantApplications'][index];
            if (app.state === 'approved') {
                grantApplications += 1;
            }
        }
        for (let index = 0; index < jsonData['data']['grants'].length; index++) {
            const app = jsonData['data']['grants'][index];
            if (app.numberOfApplications > 0) {
                grants += 1;
            }
        }
        return {
            grantApplications,
            grants,
        };
    });
}
exports.default = getQuestbookData;
