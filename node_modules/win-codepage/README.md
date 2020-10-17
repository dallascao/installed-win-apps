# Code page [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/win-codepage/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/win-codepage)

Get and set the current Windows terminal code page.

[![NPM Badge](https://nodei.co/npm/win-codepage.png)](https://npmjs.com/package/win-codepage)

## Install

```sh
npm install win-codepage
```

## Usage

```js
const codePage = require("win-codepage");

(async () => {
	await codePage()
	//=> 850

	await codePage(65001) // Set to unicode

	await codePage()
	//=> 65001
})()
```

## API

### codePage(page)

#### page

Type: `number`

The page number to set.
