'use strict'
const client = require('../tools/oss-client')
const download = require('download')
const path = require('path')
const fs = require('mz/fs')
async function checkExist (fileName) {
  try{
    const result = await client.get('/all/' + fileName)
    if(result.res.status === 200) {
      return result.res.requestUrls[0]
    }else{
      return false
    }
  }catch(e) {
    if(e.code === 'NoSuchKey') {
      return false
    }else{
      console.log(e)
    }
  }
}
async function upload (targetFilePath, filePath) {
  return await client.put(targetFilePath, filePath)
}
async function uploadPic (fileUrl, fileName, tags) {
  const fileTempPath = path.resolve(__dirname, 'temp', fileName)
  await fs.writeFile(fileTempPath, await download(fileUrl))
  const promiseArr = [ upload('/all/' + fileName, fileTempPath) ]
  for (const tag of tags) {
    promiseArr.push(upload('/' + tag + '/' + fileName, fileTempPath))
  }
  const result = await Promise.all(promiseArr)
  fs.unlink(fileTempPath)
  console.log('done')
  return result
}
module.exports = {
  checkExist,
  uploadPic
}
