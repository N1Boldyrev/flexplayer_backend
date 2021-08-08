"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.videoService = void 0;
var express_1 = require("express");
var utils_1 = require("../../utils");
var mime_1 = __importDefault(require("mime"));
var fs_1 = __importDefault(require("fs"));
exports.videoService = express_1.Router();
exports.videoService.get("/video/*", function (req, res) {
    try {
        var path = "" + req.params[0];
        var mimeType = mime_1["default"].lookup(path);
        var stat = fs_1["default"].statSync(path);
        var fileSize = stat.size;
        var range = req.headers.range;
        if (range) {
            var parts = range.replace(/bytes=/, "").split("-");
            var start = parseInt(parts[0], 10);
            var end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            var chunksize = end - start + 1;
            var file = fs_1["default"].createReadStream(path, { start: start, end: end });
            var head = {
                "Content-Range": "bytes " + start + "-" + end + "/" + fileSize,
                "Accept-Ranges": "bytes",
                "Content-Length": chunksize,
                "Content-Type": mimeType
            };
            res.writeHead(206, head);
            file.pipe(res);
        }
        else {
            var head = {
                "Content-Length": fileSize,
                "Content-Type": mimeType
            };
            res.writeHead(200, head);
            fs_1["default"].createReadStream(path).pipe(res);
        }
    }
    catch (e) {
        utils_1.errorController(res, 404, "Файл не найден", e);
    }
});
