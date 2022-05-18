## installed-win-apps

returns the paths of all installed apps on Windows

**Update 1.1.3**: Bug fixed: not working when script path includes spaces. (a bug with npm win-lnk-parser)

**Update 1.1.1**: You can filter installed paths by passing a keyword as argument

**Update 1.0.8**: Fixed a bug with win-codepage module as it won't work on non-English Windows

**Why**: I could not use the existing modules to get the path of certain programs like WPS

**How**: Read start menu folders recursively for shortcut files (.lnk) and get the path information.

**Who am I**: Developer of GT4T [gt4t.net](https://gt4t.net), a file translator app that translates Office, Markdown, PDF, HTML files in batches. No file upload needed.

## installation
```
npm i installed-win-apps
```

## Usage
```
    const installedPaths = require ('installed-win-apps');

    installedPaths.getAllPaths().then (paths=>{
        console.log(paths)   //paths is an array that contains the paths of all installed apps. e.g. [{lnk: "file file path.lnk", target: "target exe path.exe"}]
    })

    //Check if Microsoft Word is installed; returns an array if found and false if not found;
    installedPaths.getAllPaths("Microsoft Word").then (paths=>{
        console.log(paths)   //paths is an array that contains the paths of all installed apps with name containing "Microsoft Word". e.g. [{lnk: "file file path.lnk", target: "target exe path.exe"}]
    })


    installedPaths.getAllPaths("no such an app!").then (paths=>{
        console.log(paths)   //false
    })


```


## Caveats
- Implementation only currently supports Windows systems
