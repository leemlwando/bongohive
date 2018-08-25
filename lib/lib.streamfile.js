const path = require('path');
const fs = require('fs');

module.exports = (req,res)=>{

	fs.readdir(path.join(__dirname,'../uploads/'),(err,filenames)=>{
	filenames.map(file=>fs.createReadStream(path.join(__dirname,'../uploads/'+file)).pipe(res))


	});
}