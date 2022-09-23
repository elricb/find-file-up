# @elricb/find-file-up

Steps up one directory at a time searching for a file.  Stops at user home directory or top of path tree.  I made this to help with the [dotenv package](https://github.com/motdotla/dotenv); see `dotenv Usage` for usage.

## Requirements

* [node](https://nodejs.org/en/download/) - recommended lts version >= 12

## Install

```
$ npm install --save @elricb/find-file-up
```

## Usage

```jsx
import process from "process";
import path from "path";
import findFileUp from "@elricb/find-file-up";

const configPath = findFileUp(__dirname, ".env") || path.join(process.env.HOME, ".env");

console.log(configPath);
```

## dotenv Usage

```jsx
import findFileUp from "@elricb/find-file-up";

require("dotenv").config({ path: findFileUp(__dirname, ".env") || undefined });
```

## Documentation

### Release Notes

View commit tag for release notes.

* [release list](https://github.com/elricb/find-file-up/tags)

### API

See `./docs/index.html`.

