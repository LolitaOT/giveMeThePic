'use strict'
const fs =require('mz/fs')
const OSS = require('./oss')
const $ = require('superagent')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({
  origin:'*'
}))

app.get('/test', async (req, res) => {
  const r = await $.get('https://api.lolicon.app/setu/?apikey=644841555e708ca98670d5&num=10')
  getPic(r.body)
  res.json(r.body)
})

app.listen(12450, () => {
  console.log('serve running on 12450')
})

async function getPic (result) {
  console.time('计时结束')
  if(result.code !== 0) {
    return console.log('请求失败')
  }
  const data= result.data
  const returnUrls = []
  let promiseArr = []
  const nameMap = []
  for (const item of data) {
    const suffix = item.url.split('.').pop()
    const fileName = item.uid + '-' + item.pid + '.' + suffix
    nameMap.push({
      fileName:fileName,
      tags:item.tags
    })
    promiseArr.push(OSS.checkExist(fileName))
    // result = await OSS.checkExist(fileName)
    // if(!result) {
    //   console.log('图片(' + 1 + ')不存在,需要上传')
    //   result = await OSS.uploadPic(data.url, fileName, data.tags)
    // }
  }
  let promiseResult = await Promise.all(promiseArr)
  promiseArr = []
  for (const index in promiseResult) {
    if(!promiseResult[index]) {
      console.log('图片(' + index + ')不存在,需要上传')
      returnUrls.push(data[index.url])
      promiseArr.push(OSS.uploadPic(data[index].url, nameMap[index].fileName, nameMap[index].tags))
    }else{
      returnUrls.push(promiseResult[index])
    }
  }
  promiseResult = await Promise.all(promiseArr)
  console.log(returnUrls)
  console.log(promiseResult)
  console.timeEnd('计时结束')
}
// getPic()
