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
function getLayer3Data(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonData = (yield (0, utils_1.gqlFetcher)('https://beta.layer3.xyz/api/graphql', `query GetUserFromAddress($address: String!) {
        user(address: $address) {
          ...ProfilePageFields
          __typename
        }
      }

      fragment ProfilePageFields on User {
        coverCid
        ...UserCardFields
        contributions {
          numberOfContributions
          Dao {
            id
            ...DaoLogoFields
            __typename
          }
          __typename
        }
        submissionStats {
          numberOfSubmissions
          Dao {
            id
            namespace
            ...DaoLogoFields
            __typename
          }
          __typename
        }
        __typename
      }

      fragment UserCardFields on User {
        id
        username
        avatarCid
        address
        twitterUsername
        level
        xp
        xpRequiredForNextLevel
        gmStreak
        contributions {
          numberOfContributions
          Dao {
            id
            ...DaoLogoFields
            __typename
          }
          __typename
        }
        __typename
      }

      fragment DaoLogoFields on Dao {
        name
        logoCid
        __typename
    }`, { address: address }));
        return jsonData['data'];
    });
}
exports.default = getLayer3Data;
