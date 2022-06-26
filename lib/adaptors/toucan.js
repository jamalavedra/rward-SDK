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
const utils_1 = require("ethers/lib/utils");
const utils_2 = require("../utils");
function getToucanData(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonData = (yield (0, utils_2.gqlFetcher)('https://api.thegraph.com/subgraphs/name/co2ken/tokenizer', `{
        users(where: {creator: "${address.toLowerCase()}"}) {
            retirementsCreated {
                amount
            }
        }
    }`));
        if (jsonData.data.users.length > 0 &&
            jsonData.data.users[0].retirementsCreated.length > 0) {
            let totalAmount = 0;
            for (let index = 0; index < jsonData.data.users[0].retirementsCreated.length; index++) {
                const retirementEvent = jsonData.data.users[0].retirementsCreated[index];
                totalAmount += parseFloat((0, utils_1.parseEther)(retirementEvent.amount).toString());
            }
            return {
                totalAmount,
            };
        }
        else {
            return {};
        }
    });
}
exports.default = getToucanData;
