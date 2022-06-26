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
function getCoordinapeData(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const json = (yield (0, utils_1.fetcher)('GET', `https://api.coordinape.com/api/v2/profile/${address}`, '', {}, {
                authorization: 'Bearer 1693|Ku84NovTfLAyhjvWAIlTdwH0PBuGHwTWHRhtcsww',
            }));
            let teammates = 0;
            if (Boolean(json === null || json === void 0 ? void 0 : json.users) === true) {
                json['users'].forEach((user) => {
                    teammates += user.teammates.length;
                });
            }
            return {
                teammates,
            };
        }
        catch (error) {
            console.log(error);
            return {};
        }
    });
}
exports.default = getCoordinapeData;
