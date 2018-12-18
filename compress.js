/*

Compress static assets like js,css, and html to gzip and brotli formats
this will generate .zip and .br files in same dist directory
gzip is used as fallback to brotli
first install brotli and zlib packages as dev dependencies
   npm install --save-dev brotli 
   npm install --save-dev zlib

*/

const brotli = require('brotli');
const zlib = require('zlib');
const fs = require('fs');
const compressDir = 'dist/';

const brotliSettings = {
  extension: 'br',
  skipLarger: true,
  mode: 1, 
  quality: 10, 
  lgwin: 12 
}


function compressFiles(dir)
{

fs.readdirSync(dir).forEach(file => {	
	if(fs.lstatSync(dir+file).isDirectory())
		compressFiles(dir+file+'/');
	else{

		   if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {

		////////// brotli compression ///////////////////////////////
				const result = brotli.compress(fs.readFileSync( dir+'/' + file), brotliSettings)
			    fs.writeFileSync( dir + file + '.br', result);
		    
		///////// gzip compression //////////////////////////////////
		      fs.createReadStream( dir+file).pipe(zlib.createGzip())
		      .pipe(fs.createWriteStream( dir+file + '.gz'));


		  }

	}
  
});



}

compressFiles(compressDir);


