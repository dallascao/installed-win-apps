## installed-win-apps
returns the paths of all installed apps on Windows

**Why**: I could not use the existing modules to get folders of certain programs like WPS

**How**: Read recursively the shortcut files (.lnk) and get the path information.

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

    installedPaths.searchInstalledPath("WPS").then (paths=>{
        console.log(paths)   //paths is an array that contains the paths containing the word "WPS"
    })
```

## Example
```

const installedPaths = require ('installed-win-apps');
const main = async()=>{
    const temp = await installedPaths.searchInstalledPath("ksolaunch.exe");
    console.log(temp[0]); //C:\Users\dallas_game\AppData\Local\Kingsoft\WPS Office\ksolaunch.exe
    
}
main()

```

## Caveats
- Implementation only currently supports Windows systems
