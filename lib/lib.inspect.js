const path = require('path');
const fs = require('fs');
const {spawn} = require('child_process');

module.exports = (req,res)=>{
	res.writeHead(200,{'Content-Type':'text/plain'})

	fs.readdir(path.join(__dirname,'../uploads/'),(err,filenames)=>{

	filenames.map(file=>{
		spawn('packager',[`in=${path.resolve(__dirname,'../uploads/'+file)}`,'--dump_stream_info']).stdout.pipe(res)
	})


	});
}