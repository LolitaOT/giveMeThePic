'use strict'
// const $ = require('superagent')
const oss = require('./oss')
async function main () {
  const r = await oss.checkExist('test.png')
  console.log(r)
}
main()
