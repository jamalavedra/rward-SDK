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
function checkBrightId(address) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, utils_1.fetcher)('GET', `https://app.brightid.org/node/v5/verifications/Convo/${address.toLowerCase()}`);
            return Boolean((_a = data['data']) === null || _a === void 0 ? void 0 : _a.unique);
        }
        catch (error) {
            return false;
        }
    });
}
exports.default = checkBrightId;
