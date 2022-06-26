"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSybilData = exports.getAllSybilData = void 0;
const utils_1 = require("ethers/lib/utils");
const utils_2 = require("../utils");
function getAllSybilData() {
  return __awaiter(this, void 0, void 0, function* () {
    const data = yield (0, utils_2.fetcher)(
      "GET",
      "https://rward.xyz/gitcoindata.json"
    );
    const addDb = [];
    for (let index = 0; index < data["addresses"].length; index++) {
      if ((0, utils_1.isAddress)(data["addresses"][index][0]) === true) {
        addDb.push(data["addresses"][index][0]);
      }
    }
    return addDb;
  });
}
exports.getAllSybilData = getAllSybilData;
function getSybilData(address, computeConfig) {
  return __awaiter(this, void 0, void 0, function* () {
    if (
      Boolean(
        computeConfig === null || computeConfig === void 0
          ? void 0
          : computeConfig.CNVSEC_ID
      ) === false
    ) {
      throw new Error("getSybilData: computeConfig does not contain CNVSEC_ID");
    }
    const json = yield (0, utils_2.fetcher)(
      "GET",
      `https://cnvsec.vercel.app/api/get?id=${computeConfig.CNVSEC_ID}&slug=uniswap&address=${address}`
    );
    return json;
  });
}
exports.getSybilData = getSybilData;
