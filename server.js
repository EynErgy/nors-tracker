var express = require('express')
  , tracker = require('pixel-tracker')
  , app = express()
  , cookieParser = require('cookie-parser')

app.use(cookieParser())

tracker
  .use(function (error, result) {
    console.log(JSON.stringify(result, null, 2))
  })

app.all('/pixel', tracker.middleware)

app.listen(process.argv[2] || 3000)