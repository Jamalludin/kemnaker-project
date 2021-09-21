const fs = require('fs')
const mime = require('mime')
require ('dotenv').config()

const fileNameDirectory = async (path) => {
    const dateObj = new Date();
    const date = ("0" + (dateObj.getDate())).slice(-2)
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2)
    const year = dateObj.getFullYear();
    const hour = ("0" + (dateObj.getHours())).slice(-2)
    const minutes = ("0" + (dateObj.getMinutes())).slice(-2)
    const second = ("0" + (dateObj.getSeconds())).slice(-2)

    const directoryName = `/${path}/${year+"_"+month}/`
    const diskFilename = year + "_" + month + "_" + date + "_" + hour + "_" + minutes + "_" + second

    return {
        directoryName,
        diskFilename
    }
}

async function checkDirektory(path) {
    if (!fs.existsSync(path)) {
        await fs.promises.mkdir(path,
            { recursive: true }, async err => {
                console.log("err => ", err)
            })
    }
}

async function uploadImage(image64Base, nik, path) {
    let matches = image64Base.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    let response = {}

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    let file = await fileNameDirectory(path)

    response.type = matches[1]
    response.data = new Buffer(matches[2], 'base64')

    let decodedImg = response;
    let imgBuffer = decodedImg.data
    let type = decodedImg.type
    let extension = mime.extension(type)

    let fileName = `${+nik+"_"+file.diskFilename+"."+extension}`
    let pathFile = `${process.env.UPLOAD_DEST}${file.directoryName}`

    await checkDirektory(pathFile)

    try {
        fs.writeFileSync(pathFile + fileName, imgBuffer, 'utf8')

        return {
            location: file.directoryName,
            fileName: fileName
        }
    } catch (e) {
        console.error(e)
        return false
    }
}

module.exports = {
    uploadImage
}