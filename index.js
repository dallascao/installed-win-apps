const lsDir = require('list-files-in-dir');
const os = require("os");
const path = require('path');
const lnkParser = require('win-lnk-parser')
const codePage = require("win-codepage");
 

const myExport = {

    async _getpath(folder) {        
        const myCodePage = await codePage()
        const files = await lsDir.listFiles(folder);       
        
        const getTargetPath = async (myItem) => {
            try {
                const lnkObj = await lnkParser(myItem, myCodePage)
                return lnkObj.targetPath
            }catch (e) {
                return ""
            }
        }
        const promises = [];
        for (const item of files) {            
            let ext = path.extname(item);                                   
            
            if (ext.toLowerCase() === ".lnk") {
                promises.push(getTargetPath(item))
            }            
        }

        return (await Promise.all(promises)).filter(ele=>ele!=="")
        
    },

    async getAllPaths() {
        const folders = [
            os.homedir() + "\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs",
            "C:\\Users\\Default\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs",
        ]
        const promises = [this._getpath(folders[0]), this._getpath(folders[1])];
        const allPaths = await Promise.all(promises);
        return [...allPaths[0], ...allPaths[1]]
    },
    /**
     * provide a key word and returns an array of paths
     * @param {String} keyword 
     * @returns {Promise:Array} array of paths that contain the keyword
     */
    async searchInstalledPath(keyword) {
        
        const allPaths = await this.getAllPaths();
        return allPaths.filter(ele=>ele.includes(keyword))
    }
}

module.exports = myExport

// const installedPaths = myExport
// /*
// installedPaths.getAllPaths().then (paths=>{
//     console.log(paths)   //paths is an array that contains the paths of all installed apps
// })

// installedPaths.searchInstalledPath("WPS").then (paths=>{
//     console.log(paths)   //paths is an array that contains the paths containing the word "WPS"
// })
// */
// //to get the paths of WPS executable
// const main = async()=>{
//     const temp = await installedPaths.searchInstalledPath("ksolaunch.exe");
//     console.log(temp[0]);
    
// }

// main()