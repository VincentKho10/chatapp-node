"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
function errorHandler(res, err) {
    res.json(err);
    console.error("Error: " + err.message);
}
