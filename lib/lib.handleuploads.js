const Busboy = require('busboy');
const inspect = require('util').inspect;
const {error} = require('../utils')
const path = require('path');
const fs = require('fs');

module.exports = (req,res)=>{

const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

      	
      	let fileDir = filename;
      	let uploadDir = path.join(__dirname,'../uploads/'+filename)
      	
      	let destination = fs.createWriteStream(uploadDir);
      	file.pipe(destination).on('error',(error)=>error(error,res))

    });

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });

    busboy.on('finish', function() {

      console.log('Done parsing form!');
      res.writeHead(303, { Connection: 'close', Location: '/' });
      res.end();
    });
    req.pipe(busboy);
}