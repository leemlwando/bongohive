const http = require('http');
const fs = require('fs');
const path = require('path');

//require upload handler
const {uploads,streamFile,inspectFile} = require('./lib');


http.createServer(serverHandler)
	.listen(3000,()=>console.log('server started on port 3000'))


	function serverHandler(req,res) {
		console.log(req.url)
		if(req.method ==='GET'){
			//SERVER GET REQUEST
			switch(req.url){
				case '/':
					//server index page
					let index = fs.createReadStream(path.join(__dirname,'/views/index.html'))
					// console.log('GET /')
					index.pipe(res);
					break;
				case '/main.js':
					// console.log('GET /main.js')
					fs.createReadStream(path.join(__dirname,'/static/js/main.js')).pipe(res)
					break;
				case '/js/plupload.full.min.js':
					// console.log('js/plupload.full.min.js')
					fs.createReadStream(path.join(__dirname,'/static/js/plupload.full.min.js')).pipe(res)
					break;
				case '/stream':
					
					fs.createReadStream(path.join(__dirname,'/views/stream.html')).pipe(res)
					break;
				case '/file':
					
					streamFile(req,res);
					break;
				case '/inspect':
					
					inspectFile(req,res);
					break;
			default:
				//send file not found
				fs.createReadStream(path.join(__dirname,'/views/404.html')).pipe(res)
			}
		}else if(req.method==='POST'){
			//SERVE POST REQUEST
			switch(req.url){
				case '/upload':
					//server uploads
					uploads(req,res)
					break;
				default:
					//send 404
			}
		}else{

			//send request method not accepted
		}
	}