const util = require('util')
const iconv = require('iconv-lite')
const { exec } = require('child_process')
const execAsync = util.promisify(exec)

module.exports = async (fullPath, codePage = 850) => {
    const vbScript = __dirname + '\\lnkParser.wsf'
    const resultBuffer = await execAsync(`chcp ${codePage} | cscript.exe /NoLogo ${vbScript} "${fullPath}"`, {
        encoding: 'buffer'
    })
    if (resultBuffer.err) throw Error(err)
    if (resultBuffer.stderr && resultBuffer.stderr.length) throw Error(iconv.decode(resultBuffer.stderr, `cp${codePage}`))

    const result = iconv.decode(resultBuffer.stdout, `cp${codePage}`);
    const lines = result.split("\r\n")
    const lnkCsv = lines[0].split(",")
    return {
        targetPath: lnkCsv[0],
        windowStyle: lnkCsv[1],
        hotKey: lnkCsv[2],
        iconLocation: lnkCsv[3],
        description: lnkCsv[4],
        workingDirectory: lnkCsv[5]
    }
}
