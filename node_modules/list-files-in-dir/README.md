# list-files-in-dir

Lists recursively files in the specified directory.

## Installation

```sh
npm install list-files-in-dir --save
```

## Usage

```
import {listFiles} from 'list-files-in-dir';

// As second parameter you can optionally pass the extension to filter the files
listFiles('example/path')
    .then(files => {
        // do what ever you want with the file paths
    });
```

Additionally `listFilesSync` is available.

## Tests

```sh
npm install
npm test
```

## Dependencies

- [@types/node](https://www.github.com/DefinitelyTyped/DefinitelyTyped.git): TypeScript definitions for Node.js

## Dev Dependencies

- [rimraf](): A deep deletion module for node (like `rm -rf`)
- [tslint](https://github.com/palantir/tslint): An extensible static analysis linter for the TypeScript language
- [typescript](https://github.com/Microsoft/TypeScript): TypeScript is a language for application scale JavaScript development


## License

MIT
