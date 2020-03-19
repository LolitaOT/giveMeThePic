'use strict'
const oss = require('ali-oss')
const config = require('../config/oss')
module.exports = new oss(config)
