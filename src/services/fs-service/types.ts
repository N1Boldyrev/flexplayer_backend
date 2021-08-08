export enum PathType {
  FILE = "FILE",
  DIR = "DIR",
}

export type File = {
  name: string;
  extension?: string;
};

export type FsServiceResponse = {
  currentPathType: PathType;
  innerFiles?: File[];
  fileUrl?: string;
};
