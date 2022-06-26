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
function getFortaData(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = (yield (0, utils_1.gqlFetcher)('https://explorer-api.forta.network/graphql', `query Retrive($getListInput: GetAlertsInput) {
        getList(input: $getListInput) {
            alerts {
                hash
                description
                severity
                protocol
                name
                everest_id
                alert_id
                scanner_count
                source {
                    tx_hash
                    agent {
                        id
                        name
                    }
                }
            }
        }
    }`, {
            getListInput: {
                severity: ['HIGH', 'MEDIUM', 'CRITICAL'],
                txHash: '',
                text: '',
                muted: [],
                limit: 10000,
                sort: 'desc',
                agents: [],
                addresses: [address.toLowerCase()],
                project: '',
            },
        }));
        const result = [];
        for (let index = 0; index < resp.data.getList.alerts.length; index++) {
            const alert = resp.data.getList.alerts[index];
            result.push({
                severity: alert === null || alert === void 0 ? void 0 : alert.severity,
                protocol: alert === null || alert === void 0 ? void 0 : alert.protocol,
                source: alert === null || alert === void 0 ? void 0 : alert.source,
            });
        }
        return result;
    });
}
exports.default = getFortaData;
