## installed-win-apps
returns the paths of all installed apps on Windows

**Update 1.0.8**: Removed dependency win-codepage module as it won't work on non-English Windows
**Why**: I could not use the existing modules to get the path of certain programs like WPS

**How**: Read start menu folders recursively for shortcut files (.lnk) and get the path information.

## installation
```
npm i installed-win-apps
```

## Usage
```
    const installedPaths = require ('installed-win-apps');

    installedPaths.getAllPaths().then (paths=>{
        console.log(paths)   //paths is an array that contains the paths of all installed apps
    })

```


## Caveats
- Implementation only currently supports Windows systems
