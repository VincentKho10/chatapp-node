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
const express_1 = require("express");
const user_data_1 = require("../data/user_data");
const route = (0, express_1.Router)();
const user_data = new user_data_1.UserData();
route.post('/login', (req, res) => {
    const { username, password } = req.body;
    user_data.db.getConnection().serialize(() => __awaiter(void 0, void 0, void 0, function* () {
        const uid = yield user_data.login(username, password);
        const user = yield user_data.getByUid(uid);
        console.log(user);
    }));
});
exports.default = route;
