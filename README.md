<p align="center"><img width="143px" height="130px" src="https://github.com/tyankatsu0105/birthpec/blob/develop/assets/logo.png" alt="Birth spec files"></p>

<h2 align="center">birthpec</h2>
<p align="center">
  Birth spec file 👶
</p>
<p align="center">
🚧WIP🚧
</p>

<p align="center">
  <a title="Current version" href="https://badge.fury.io/js/birthpec" rel="nofollow">
    <img src="https://badge.fury.io/js/birthpec.svg">
  </a>
  <a title="deploy" href="https://github.com/algolia/shipjs" rel="nofollow">
    <img src="https://img.shields.io/badge/deploy-🛳Ship.js-blue?style=flat">
  </a>
  <a title="MIT License" href="[LICENSE](https://opensource.org/licenses/MIT)" rel="nofollow">
    <img src="https://img.shields.io/badge/License-MIT-green.svg">
  </a>
  <br>
  <br>
</p>

- Generate spec file
  - Supports
    - js
    - ts
    - jsx
    - tsx
- Read exports items
- Be able to config with `.birthpecrc.js`
- Be able to edit template with ejs

## Usage

```bash
npm install -D birthpec
```

```bash
birthpec -h

Usage: birthpec <template-name> <target-file-path>

Run config initialization wizard

Options:
  -v, --version  Print version of birthpec
  -h, --help     Show help

Commands:
  init

Example:
  $ birthpec basic src/shared/helpers/sum.ts
  $ birthpec init
```

### Commands

#### birthpec init

```bash
birthpec init
```

Generate birthpec config file and templates directory.

#### birthpec <template-name> <target-file-path>

```bash
birthpec basic src/index.ts
```

Generate spec file.

##### template-name

For example:

```bash
__birthpec/
└── basic
    └── index.ejs
```

`template-name` is basic.

##### target-file-path

For example:

```bash
src/
└── index.ts
```

If you want to generate spec file of `index.ts`, `src/index.ts` is target-file-path.

### template

birthpec supports [ejs](https://github.com/mde/ejs) and [front-matter](https://github.com/jxson/front-matter) for generate spec file's template.
You can also edit template file.

```bash
__birthpec/
└── basic
    └── index.ejs
```

`__birthpec/basic/index.ejs`

```ejs
---
to: <%= dirName %>/__tests__/<%= fileName %>.spec.<%= extensionName %>
---
import {<% for (const exportItem of exportItems) { %> <%= exportItem %>, <% } %>} from '../<%= fileName %>';

describe('<%= helper.projectName %> <%= helper.changeCase.camelCase(fileName) %>', () => {
  <% for (const exportItem of exportItems) { %>
  describe('<%= exportItem %>', () => {
    it('', () => {

    });
  });
  <% } %>
});
```

You should include `index.ejs` into template directory.

For example:

```bash
./
├── __birthpec
│   └── basic
│       └── index.ejs
└── src
    └── index.ts
```

`.birthpecrc.js`

```js
module.exports = {
  templates: `__birthpec`,
};
```

In this case, when run `birthpec basic src/index.ts`, birthpec see `__birthpec/basic/index.ejs`

#### Reserved words

You can edit template

| name                   | type     | description         | example                        |
| :--------------------- | :------- | ------------------- | :----------------------------- |
| `<%= fileName %>`      | string   | file name           | `path/to/file.js` => `file`    |
| `<%= dirName %>`       | string   | directory name      | `path/to/file.js` => `path/to` |
| `<%= extensionName %>` | string   | file extension name | `path/to/file.js` => `js`      |
| `<%= exportItems %>`   | string[] | export items        | [See](#exportItems)            |
| `<%= helper %>`        | object   | helper functions    | [See](#helper)                 |

##### exportItems

```js
export const foo = 1;
export const fn = () => 2;

// exportItems => ['foo', 'fn']
```

Current supports:

- ExportNamedDeclaration
- ExportDefaultDeclaration
- TSExportAssignment

> commonjs has not supported yet.

##### front-matter

You can use front-matter syntax in ejs template file.
Now supports:

- to
  - generate path

## Config

Please create `.birthpec.rc.js` on your root.

### templates

Select templates directory.

```js
module.exports = {
  templates: `__birthpec`,
};
```

### helper

Now supports [change-case](https://github.com/blakeembrey/change-case).

```js
<%= helper.changeCase.camelCase('foo bar') %>
// => fooBar
```

Of course, you can add your helper.

```js
module.exports = {
  helper: {
    projectName: 'project',
    src(name) {
      return `path/to/images/${name}`;
    },
  },
};
```

```js
<%= helper.projectName %>
// => project

<%= helper.src('aaaaa') %>
// => path/to/images/aaaaa
```

## Development

```bash
npm run build
npm run sandbox

cd ./sandbox

birthpec init
```

## Inspired of

[hygen](https://github.com/jondot/hygen)

## LICENSE (MIT)

See [LICENSE](https://github.com/tyankatsu0105/birthpec/blob/master/LICENSE)
