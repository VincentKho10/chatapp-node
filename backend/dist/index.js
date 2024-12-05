"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./route/user_routes"));
require('dotenv').configDotenv({ path: './.env/dev.env' });
require('dotenv').configDotenv({ path: './.env/prod.env' });
var jwt = require('jsonwebtoken');
var fs = require('fs');
const path = process.env.SERV_PATH || "";
const port = parseInt(process.env.SERV_PORT || "2334");
// const port: number = parseInt(process.env.SERV_PORT?process.env.SERV_PORT:"2334")
const proto = process.env.SERV_PROTO;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('hello world');
});
app.use('/user', user_routes_1.default);
app.listen(port, path, () => {
    console.log(`Listening on ${proto}${path}:${port}`);
});
