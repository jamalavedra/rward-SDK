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
function getRss3Data(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonData = (yield (0, utils_1.fetcher)('GET', `https://hub.pass3.me/${address}`));
        return {
            profile: Boolean(jsonData['profile']) === true ? jsonData['profile'] : {},
            backlinks: Boolean(jsonData['@backlinks']) === true ? jsonData['@backlinks'] : [],
            accounts: Boolean(jsonData['accounts']) === true ? jsonData['accounts'] : [],
            links: Boolean(jsonData['links']) === true ? jsonData['links'] : [],
        };
    });
}
exports.default = getRss3Data;
