import express from "express";
import { File } from "../services/fs-service/types";
import fs from "fs";

export const sendJson = (res: express.Response, status: number, data: Object) =>
  res.status(status).send(JSON.stringify(data));

export const errorController = (res: express.Response, status: number, message: string, e?: any) => {
  if (e) console.error(e);
  res.status(status).send({ message: message });
};

export const readDir = (path: string): File[] => {
  const files: File[] = [];
  fs.readdirSync(path).forEach((file) => files.push({ name: file.split(".")[0], extension: file.split(".")[1] }));
  return files;
};

export const findFile = (path: string): string | null => {
  const splitPath = path.split("/");
  const splitFile = splitPath[splitPath.length - 1];
  let dirPath = "";
  for (let i = 0; i < splitPath.length - 1; i++) {
    dirPath += `${splitPath[i]}/`;
  }
  try {
    const files = fs.readdirSync(dirPath);
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      if (files[i].indexOf(splitFile) >= 0 && files[i].lastIndexOf(splitFile) >= 0) {
        return dirPath + files[i];
      }
    }
  } catch {
    return null;
  }
};
