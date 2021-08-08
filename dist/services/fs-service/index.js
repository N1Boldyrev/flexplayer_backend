"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.__esModule = true;
exports.fsService = void 0;
var express_1 = require("express");
var fs = __importStar(require("fs"));
var types_1 = require("./types");
var utils_1 = require("../../utils");
exports.fsService = express_1.Router();
exports.fsService.get("/fs", function (req, res) {
    try {
        var response = { currentPathType: types_1.PathType.DIR, innerFiles: utils_1.readDir(process.env.FILES) };
        utils_1.sendJson(res, 200, response);
    }
    catch (e) {
        utils_1.errorController(res, 404, "Файл не найден", e);
    }
});
exports.fsService.get("/fs/*", function (req, res, next) {
    try {
        var response = {
            currentPathType: types_1.PathType.DIR,
            innerFiles: utils_1.readDir(process.env.FILES + "/" + req.params[0])
        };
        utils_1.sendJson(res, 200, response);
    }
    catch (_a) {
        next();
    }
});
exports.fsService.get("/fs/*", function (req, res) {
    var path = utils_1.findFile(process.env.FILES + "/" + req.params[0]);
    if (fs.existsSync(path)) {
        var response = {
            currentPathType: types_1.PathType.FILE,
            fileUrl: "video/" + path
        };
        utils_1.sendJson(res, 200, response);
    }
    else
        utils_1.errorController(res, 404, "Файл не найден");
});
