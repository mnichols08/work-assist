var express = require('express');
var router = express.Router();

const { index} = require('../controls/open.controller')

router.get('/', index)

module.exports = router;