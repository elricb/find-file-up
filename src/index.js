import process from "process";
import {existsSync} from "fs";
import path from "path";

function findFileUp(baseDirectory, file) {
  const trailSep = /[\\/]$/;
  let seek = true;
  let directory = baseDirectory;

  while (seek) {
    if (!existsSync(directory)) {
      seek = false;
    } else if (existsSync(path.join(directory, file))) {
      directory = path.join(directory, file);
      seek = false;
    } else if ((process.env.HOME || process.env.USERPROFILE) === directory) {
      seek = false;
    } else if (path.parse(directory).root === directory) {
      seek = false;
    } else {
      directory = path
        .normalize(path.join(directory, ".."))
        .replace(trailSep, "");
    }
  }

  return directory;
}

export default findFileUp;
