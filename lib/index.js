"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convo = void 0;
const comments_1 = __importDefault(require("./comments"));
const auth_1 = __importDefault(require("./auth"));
const base_1 = __importDefault(require("./base"));
const threads_1 = __importDefault(require("./threads"));
const omnid_1 = __importDefault(require("./omnid"));
class Convo extends base_1.default {
  constructor(apikey, node = "https://rward.xyz/api") {
    super(apikey, node);
    this.comments = new comments_1.default(apikey, this.node);
    this.auth = new auth_1.default(apikey, this.node);
    this.threads = new threads_1.default(apikey, this.node);
    this.omnid = new omnid_1.default(apikey, this.node);
    return this;
  }
}
exports.Convo = Convo;
