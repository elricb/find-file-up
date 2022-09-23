import process from "process";
import {existsSync} from "fs";
import path from "path";

/**
 * Search for file, stepping up a directory each time it's not found.
 *
 * @returns string - blank string when not found
 *
 * ```javascript
 * import findFileUp from "@elricb/find-file-up";
 *
 * if (const directory = findFileUp(__basename, ".env")) {
 *   config(directory);
 * }
 * ```
 */

function findFileUp(baseDirectory: string, file: string): string {
  const trailSep = /[\\/]$/;
  let seek = true;
  let directory = baseDirectory;

  while (seek) {
    if (!existsSync(directory)) {
      directory = "";
      seek = false;
    } else if (existsSync(path.join(directory, file))) {
      directory = path.join(directory, file);
      seek = false;
    } else if ((process.env.HOME || process.env.USERPROFILE) === directory) {
      directory = "";
      seek = false;
    } else if (path.parse(directory).root === directory) {
      directory = "";
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
