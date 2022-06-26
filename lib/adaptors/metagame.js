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
function getMetagameData(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = (yield (0, utils_1.gqlFetcher)('https://hasura-7s6e.onrender.com/v1/graphql', `query GetPlayers($orderBy: player_order_by!, $offset: Int, $limit: Int, $where: player_bool_exp, $forLoginDisplay: Boolean! = false) {
      player(
        order_by: [$orderBy, {ethereumAddress: desc}]
        offset: $offset
        limit: $limit
        where: $where
      ) {
        ...PlayerFragment
        __typename
      }
      player_aggregate(where: $where) {
        aggregate {
          count
          __typename
        }
        __typename
      }
    }

    fragment PlayerFragment on player {
      id @skip(if: $forLoginDisplay)
      totalXP @skip(if: $forLoginDisplay)
      seasonXP @skip(if: $forLoginDisplay)
      rank @skip(if: $forLoginDisplay)
      ethereumAddress
      profileLayout @skip(if: $forLoginDisplay)
      skills @skip(if: $forLoginDisplay) {
        Skill {
          category
          id
          name
          __typename
        }
        __typename
      }
      roles(order_by: {rank: asc}) @skip(if: $forLoginDisplay) {
        role
        rank
        PlayerRole {
          label
          __typename
        }
        __typename
      }
      accounts(where: {type: {_in: [TWITTER, GITHUB]}}) @skip(if: $forLoginDisplay) {
        identifier
        type
        __typename
      }
      profile {
        name
        username
        description
        emoji
        profileImageURL
        bannerImageURL
        backgroundImageURL
        location
        countryCode
        website
        pronouns
        availableHours
        timeZone
        colorMask
        explorerTypeTitle
        __typename
      }
      daohausMemberships @skip(if: $forLoginDisplay) {
        id
        shares
        molochAddress
        moloch {
          id
          title
          version
          totalShares
          chain
          avatarURL
          __typename
        }
        __typename
      }
      brightid_status @skip(if: $forLoginDisplay) {
        unique
        contextIds
        __typename
      }
    }
    `, {
            orderBy: {
                seasonXP: 'desc',
            },
            offset: 0,
            limit: 9,
            where: {
                _or: [
                    {
                        profile: {
                            username: {
                                _ilike: `%${address.toLowerCase()}%`,
                            },
                        },
                    },
                    {
                        ethereumAddress: {
                            _ilike: `%${address.toLowerCase()}%`,
                        },
                    },
                ],
            },
        }));
        if (data['data']['player'].length > 0) {
            return data['data']['player'][0];
        }
        else {
            return {};
        }
    });
}
exports.default = getMetagameData;
