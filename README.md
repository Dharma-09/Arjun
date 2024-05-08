![alt text](image-1.png)
<h2 align="center">Smart Contract Vulnerability analyzer</h4>

<p align="center">
  <a href="https://github.com/Dharma-09/Arjun/releases">
    <img src="https://img.shields.io/github/release/Dharma-09/Arjun.svg">
  </a>
  <a href="https://github.com/Dharma-09/Arjun/issues?q=is%3Aissue+is%3Aclosed">
      <img src="https://img.shields.io/github/issues-closed-raw/Dharma-09/Arjun.svg">
  </a>
</p>

## Table of Contents
- [Table of Contents](#table-of-contents)
  - [Prerequisite](#prerequisite)
  - [How Arjun works?](#how-arjun-works)
  - [Example](#example)
  - [Credits](#credits)
  - [Contributing](#contributing)

### Prerequisite
You'll need [Node.js](https://nodejs.org/) and [Yarn](https://nodejs.org/). Then clone the repo and run:

```sh
yarn or npm

npm i @solidity-parser/parser

npm i ast-node-builder
```
You're all set!

### How Arjun works?

```shell
yarn analyze <BASE_PATH> <SCOPE_FILE> <GITHUB_URL>
```

### Example
```shell
yarn analyze contracts scope.txt https://github.com/repo/repo 
```

- `BASE_PATH` is a relative path to the folder containing the smart contracts.
- `SCOPE_FILE` is an optional file containing a specific smart contracts scope (see scope.example.txt)
- `GITHUB_URL` is an optional url to generate links to github in the report
- For remappings, add remappings.txt to `BASE_PATH`.
- The output will be saved in a `report.md`  file.

### Credits

### Contributing
You're more than welcome to contribute! For help you can check [CONTRIBUTING.md](CONTRIBUTING.md)