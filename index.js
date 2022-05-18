const lsDir = require('list-files-in-dir');
const os = require("os");
const path = require('path');



const lnkParser = require('./lnkParser')
const codePage = require("./win-codepage.js");
 

const myExport = {

    async _getpath(folder) {        
        const myCodePage = await codePage()
        const files = await lsDir.listFiles(folder);       
        
        const getTargetPath = async (myItem) => {
            try {
                const lnkObj = await lnkParser(myItem, myCodePage)
                return {lnk: myItem, target: lnkObj.targetPath}
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

    async getAllPaths(keyword = "") {

        const homePath = os.homedir();
        const usersPath = path.dirname(homePath);
        const drivePath = path.dirname(usersPath);
        const folders = [
            homePath + "\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs",
            usersPath + "\\Default\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs",
            drivePath +  "ProgramData\\Microsoft\\Windows\\Start Menu\\Programs"
        ]
        const promises = [this._getpath(folders[0]), this._getpath(folders[1]), this._getpath(folders[2])];
        const allPaths = await Promise.all(promises);
        const pathsInfo =[...allPaths[0], ...allPaths[1], ...allPaths[2]];
        if (keyword ==="") {
            return pathsInfo;
        }
        
        const filteredPaths = pathsInfo.filter((x)=>{

            if (path.basename(x.lnk).includes(keyword)) {
                return true;
            } 
            if (path.basename(x.target).includes(keyword)) {
                return true;
            } 
        })
        if (filteredPaths.length ===0) {
            return false;
        } else {
            return filteredPaths;
        }
        
    }

}

module.exports = myExport


// const installedPaths = myExport

// installedPaths.getAllPaths("Microsoft Word").then (paths=>{
//      console.log(paths)   //paths is an array that contains the paths of all installed apps
     
// })


