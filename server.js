var express = require('express')
  , tracker = require('pixel-tracker')
  , app = express()
  , cookieParser = require('cookie-parser')
  , path = require('path')
  , fs = require('fs')
  , util = require('util')
  , moment = require('moment')
  , serveIndex = require('serve-index')



app.use(cookieParser())
app.use('/logs', express.static(path.join(__dirname, '/logs')), serveIndex(path.join(__dirname, '/logs'), {'icons': true}))


tracker
  .use(function (error, result) {
    console.log(JSON.stringify(result, null, 2))
    const timestamp = moment().format('YYMMDD-HHmmss')
    var log_file = fs.createWriteStream(__dirname + '/logs/' + timestamp + '-access.log', {flags : 'w'})
    log_file.write(util.format(result) + '\n')
  })

app.all('/pixel', tracker.middleware)

app.listen(process.argv[2] || 8888)
