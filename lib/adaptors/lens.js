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
function getLensData(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = (yield (0, utils_1.gqlFetcher)('https://api.thegraph.com/subgraphs/id/QmcH6BYapdqB6hqJSVFk4neCYCe94VDkraPRTJxEPb5ULH', `{
        profiles(where: {id: "${address.toLowerCase()}"}) {
          id
          profileId
          pubCount
          handle
          imageURI
        }
        socialGraphs(where: {id: "${address.toLowerCase()}"}) {
          following {
            handle
          }
        }
      }`));
            if (response['data']['profiles'].length > 0) {
                return {
                    profileId: parseInt(response['data']['profiles'][0].profileId),
                    pubCount: parseInt(response['data']['profiles'][0].pubCount),
                    handle: response['data']['profiles'][0].handle,
                    imageURI: response['data']['profiles'][0].imageURI,
                    following: response['data']['socialGraphs'].length > 0
                        ? response['data']['socialGraphs'][0].following.length
                        : 0,
                };
            }
            else {
                return {};
            }
        }
        catch (error) {
            return {};
        }
    });
}
exports.default = getLensData;
