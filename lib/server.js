'use strict'
const fs =require('mz/fs')
const OSS = require('./oss')
async function getPic () {
  let result = require('./result.json')
  if(result.code !== 0) {
    return console.log('请求失败')
  }
  const data= result.data[0]
  const suffix = data.url.split('.').pop()
  const fileName = data.uid + '-' + data.pid + '.' + suffix
  result = await OSS.checkExist(fileName)
  if(!result) {
    console.log('图片不存在,需要上传')
    result = await OSS.uploadPic(data.url, fileName, data.tags)
  }
  console.log(result)
}
getPic()
