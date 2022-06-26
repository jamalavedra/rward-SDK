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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gqlFetcher = exports.encodeQuery = exports.fetcher = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const abort_controller_1 = __importDefault(require("abort-controller"));
function fetcher(requestMethod, url, apikey = '', body = {}, customHeaders = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const controller = new abort_controller_1.default();
        const timeout = setTimeout(() => {
            controller.abort();
        }, 6000);
        try {
            let reqUrl = url;
            if (apikey != '') {
                reqUrl += (url.includes('?') === true ? '&' : '?') + 'apikey=' + apikey;
            }
            if (requestMethod === 'GET') {
                const response = yield (0, cross_fetch_1.default)(reqUrl, {
                    headers: Object.assign({}, customHeaders),
                    signal: controller.signal,
                });
                // console.log(response.status, response.ok);
                if (response.ok === true &&
                    response.status >= 200 &&
                    response.status < 300) {
                    const data = yield response.json();
                    return data;
                }
                else {
                    return {};
                }
            }
            else if (requestMethod === 'POST' ||
                requestMethod === 'UPDATE' ||
                requestMethod === 'DELETE') {
                const response = yield (0, cross_fetch_1.default)(reqUrl, {
                    method: requestMethod,
                    body: JSON.stringify(body),
                    headers: Object.assign(Object.assign({}, customHeaders), { 'Content-Type': 'application/json' }),
                    signal: controller.signal,
                });
                if (response.ok === true &&
                    response.status >= 200 &&
                    response.status < 300) {
                    const data = yield response.json();
                    return data;
                }
                else {
                    return {};
                }
            }
        }
        catch (error) {
            console.error(url, error);
            return { error };
        }
        finally {
            clearTimeout(timeout);
        }
    });
}
exports.fetcher = fetcher;
function encodeQuery(data) {
    let query = '';
    for (const d in data)
        query += encodeURIComponent(d) + '=' + encodeURIComponent(data[d]) + '&';
    return query.slice(0, -1);
}
exports.encodeQuery = encodeQuery;
function gqlFetcher(url, query, variables = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const controller = new abort_controller_1.default();
        const timeout = setTimeout(() => {
            controller.abort();
        }, 5000);
        try {
            const req = yield (0, cross_fetch_1.default)(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    variables,
                }),
                signal: controller.signal,
            });
            return yield req.json();
        }
        catch (error) {
            console.error(url, error);
            return { error };
        }
        finally {
            clearTimeout(timeout);
        }
    });
}
exports.gqlFetcher = gqlFetcher;
