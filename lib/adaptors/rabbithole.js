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
function getRabbitholeData(address = '') {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const jsonData = yield (0, utils_1.fetcher)('GET', `https://api.rabbithole.gg/task_progress?address=${address.toLowerCase()}`);
        if (jsonData.message === 'success') {
            const tasksCompleted = [];
            for (const task in jsonData.taskData.taskProgress) {
                const taskData = jsonData.taskData.taskProgress[task];
                if (taskData['redeemed'] === taskData['progress'] &&
                    taskData['redeemed'] != 0) {
                    tasksCompleted.push(task);
                }
            }
            const level = (_a = jsonData.taskData) === null || _a === void 0 ? void 0 : _a.level;
            return {
                level: level,
                score: jsonData.taskData['score'],
                tasksCompleted,
            };
        }
        else {
            return {};
        }
    });
}
exports.default = getRabbitholeData;
