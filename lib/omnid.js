"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Omnid_timeit, _Omnid_timeitWithConfig, _Omnid_disabledPromise;
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const adaptorList = __importStar(require("./adaptors"));
const utils_2 = require("ethers/lib/utils");
class Omnid {
    constructor(apikey, node) {
        this.adaptors = adaptorList;
        _Omnid_timeit.set(this, (callback, params, debug = false) => __awaiter(this, void 0, void 0, function* () {
            if (Boolean(debug) == true)
                console.time(callback.name);
            const resp = yield callback.apply(this, params);
            if (Boolean(debug) == true)
                console.timeEnd(callback.name);
            return resp;
        }));
        _Omnid_timeitWithConfig.set(this, (callback, params, debug = false) => __awaiter(this, void 0, void 0, function* () {
            if (Boolean(debug) == true)
                console.time(callback.name);
            const resp = yield callback.apply(this, params);
            if (Boolean(debug) == true)
                console.timeEnd(callback.name);
            return resp;
        }));
        _Omnid_disabledPromise.set(this, () => __awaiter(this, void 0, void 0, function* () {
            const resp = new Promise((res) => setTimeout(() => {
                res({ disabled: true });
            }, 0));
            return yield resp;
        }));
        this.getTrustScore = (address, noCache) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, utils_1.fetcher)('GET', `${this.node}/identity?address=${address}${Boolean(noCache) == true ? '&noCache=true' : ''}`, this.apikey, {});
        });
        this.getTrustScoreWithProof = (address) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, utils_1.fetcher)('GET', `${this.node}/zkidentity?address=${address}`, this.apikey, {});
        });
        this.computeTrustScore = (address, computeConfig, disabledAdaptors = []) => __awaiter(this, void 0, void 0, function* () {
            if ((0, utils_2.isAddress)(address) === true) {
                const promiseArray = [
                    disabledAdaptors.includes('aave')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getAaveData, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('age')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getAge, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('arcx')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getArcxData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('asyncart')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getAsyncartData, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('boardroom')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getBoardroomData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('brightid')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.checkBrightId, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('celo')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getCeloData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('coinvise')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getCoinviseData, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('context')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getContextData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('coordinape')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getCoordinapeData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('cryptoscamdb')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getCryptoscamdbData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('cyberconnect')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getCyberconnectData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('dapplist')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getDapplistData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('debank')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getDebankData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('deepdao')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getDeepDaoData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('ens')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.addressToEns, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('etherscan')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getEtherscanData, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('forta')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getFortaData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('foundation')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getFoundationData, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('gitcoin')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getGitcoinData, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('hiveone')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getHiveOneData, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('idena')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.checkIdena, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('karma')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getKarmaData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('knownorigin')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getKnownOriginData, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('layer3')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getLayer3Data, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('lens')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getLensData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('metagame')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getMetagameData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('mew')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getMewData, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('mirror')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getMirrorData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('poap')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getPoapData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('poh')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.checkPoH, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('pop')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getPopData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('polygon')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getPolygonData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('projectgalaxy')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getProjectGalaxyData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('questbook')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getQuestbookData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('rabbithole')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getRabbitholeData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('rarible')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getRaribleData, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('rss3')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getRss3Data, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('showtime')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getShowtimeData, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('superrare')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getSuperrareData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('unipass')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getUnipassData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('uniswap')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getSybilData, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('unstoppable')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.resolveUnstoppableDomains, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('yup')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getYupData, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('zapper')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeit, "f").call(this, adaptorList.getZapperData, [address], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                    disabledAdaptors.includes('zora')
                        ? __classPrivateFieldGet(this, _Omnid_disabledPromise, "f").call(this)
                        : __classPrivateFieldGet(this, _Omnid_timeitWithConfig, "f").call(this, adaptorList.getZoraData, [address, computeConfig], computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG),
                ];
                if (Boolean(computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG) === true)
                    console.time('computeTime');
                const resp = yield Promise.allSettled(promiseArray);
                const respDict = {
                    aave: resp[0],
                    age: resp[1],
                    arcx: resp[2],
                    asyncart: resp[3],
                    boardroom: resp[4],
                    brightid: resp[5],
                    celo: resp[6],
                    coinvise: resp[7],
                    context: resp[8],
                    coordinape: resp[9],
                    cryptoscamdb: resp[10],
                    cyberconnect: resp[11],
                    dapplist: resp[12],
                    debank: resp[13],
                    deepdao: resp[14],
                    ens: resp[15],
                    etherscan: resp[16],
                    forta: resp[17],
                    foundation: resp[18],
                    gitcoin: resp[19],
                    hiveone: resp[20],
                    idena: resp[21],
                    karma: resp[22],
                    knownorigin: resp[23],
                    layer3: resp[24],
                    lens: resp[25],
                    metagame: resp[26],
                    mew: resp[27],
                    mirror: resp[28],
                    poap: resp[29],
                    poh: resp[30],
                    pop: resp[31],
                    polygon: resp[32],
                    projectgalaxy: resp[33],
                    questbook: resp[34],
                    rabbithole: resp[35],
                    rarible: resp[36],
                    rss3: resp[37],
                    showtime: resp[38],
                    superrare: resp[39],
                    unipass: resp[40],
                    uniswap: resp[41],
                    unstoppable: resp[42],
                    yup: resp[43],
                    zapper: resp[44],
                    zora: resp[45],
                };
                if (Boolean(computeConfig === null || computeConfig === void 0 ? void 0 : computeConfig.DEBUG) === true)
                    console.timeEnd('computeTime');
                return respDict;
            }
            else {
                throw new Error('Not a Valid Ethereum Address');
            }
        });
        this.apikey = apikey;
        this.node = node;
        return this;
    }
}
_Omnid_timeit = new WeakMap(), _Omnid_timeitWithConfig = new WeakMap(), _Omnid_disabledPromise = new WeakMap();
exports.default = Omnid;
