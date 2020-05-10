# Birthpec

[![npm version](https://badge.fury.io/js/birthpec.svg)](https://badge.fury.io/js/birthpec)
[![deploy](https://img.shields.io/badge/deploy-🛳%20Ship.js-blue?style=flat)](https://github.com/algolia/shipjs)

🚧WIP🚧

> Birth spec files.

- Create spec file
- Be able to config with `.birthpecrc.js`
- Be able to watch directory
- Be able to edit template with ejs

## Usage

```bash
npm install -D birthpec
```

### Reserved Words

| name                 | type     | description    |
| :------------------- | :------- | -------------- |
| `<%= name %>`        | string   | file name      |
| `<%= filePath %>`    | string   | file path      |
| `<%= extension %>`   | string   | file extension |
| `<%= exportItems %>` | string[] | export items   |

## Development

```bash
npm run sandbox
```
