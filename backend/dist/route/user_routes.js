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
const express_1 = require("express");
const user_data_1 = require("../data/user_data");
const user_data_2 = require("../data/user_data");
const error_handler_1 = __importDefault(require("../util/error_handler"));
const crypto_1 = __importDefault(require("crypto"));
const route = (0, express_1.Router)();
const user_data = new user_data_1.UserData();
const connection = user_data.db.getConnection();
route.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    connection.serialize(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const uid = yield user_data.login(username, password);
            const user = yield user_data.getByUid(uid);
            res.json(user[0]);
        }
        catch (error) {
            next((0, error_handler_1.default)(res, error));
        }
    }));
});
route.post('/register', (req, res, next) => {
    const reqbody = req.body;
    const passwd = crypto_1.default.createHash('sha256').update(reqbody.password).digest('hex');
    const user = user_data_2.User.fromJson(Object.assign(Object.assign({}, reqbody), { password: passwd }));
    connection.serialize(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield user_data.createOne(user);
            res.json(res);
        }
        catch (error) {
            next((0, error_handler_1.default)(res, error));
        }
    }));
});
exports.default = route;
