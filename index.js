/* eslint-disable semi */

var fs = require('fs')
var path = require('path')
var http = require('http')

var mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.img': 'image/png'
}

http.createServer(onrequest).listen(8000)

function onrequest(req, res) {
  var route = req.url

  if (route === '/') {
    route = 'index.html'
  }

  else {
    route = 'nonexistent-file.html'
  }

  fs.readFile(path.join('static', route), onread)

  function onread(err, buf) {
    res.setHeader('Content-Type', 'text/html')

    if (err) {
      var extension = path.extname(route)
      var type = mime[extension] || 'text/plain'
      res.statusCode = 404
      res.setHeader('Content-Type', type)
      res.end(buf)


    } else {
      var extension = path.extname(route)
      var type = mime[extension] || 'text/plain'
      res.statusCode = 200
      res.setHeader('Content-Type', type)
      res.end(buf)
    }
  }
}
