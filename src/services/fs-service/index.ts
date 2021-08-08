import { Router } from "express";
import * as fs from "fs";
import { FsServiceResponse, PathType } from "./types";
import { errorController, findFile, readDir, sendJson } from "../../utils";

export const fsService = Router();

fsService.get("/fs", (req, res) => {
  try {
    const response: FsServiceResponse = { currentPathType: PathType.DIR, innerFiles: readDir(process.env.FILES) };
    sendJson(res, 200, response);
  } catch (e) {
    errorController(res, 404, "Файл не найден", e);
  }
});

fsService.get("/fs/*", (req, res, next) => {
  try {
    const response: FsServiceResponse = {
      currentPathType: PathType.DIR,
      innerFiles: readDir(`${process.env.FILES}/${req.params[0]}`),
    };
    sendJson(res, 200, response);
  } catch {
    next();
  }
});

fsService.get("/fs/*", (req, res) => {
  const path = findFile(`${process.env.FILES}/${req.params[0]}`);
  if (fs.existsSync(path)) {
    const response: FsServiceResponse = {
      currentPathType: PathType.FILE,
      fileUrl: `video/${path}`,
    };
    sendJson(res, 200, response);
  } else errorController(res, 404, "Файл не найден");
});
