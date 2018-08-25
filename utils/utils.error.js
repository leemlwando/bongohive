const path = require('path');
const fs = require('fs');

module.exports = (err,res)=>{

	return fs.createReadStream(path.join(__dirname,'/views/error.html')).pipe(res);
}