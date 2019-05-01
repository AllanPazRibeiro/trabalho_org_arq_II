const fs = require('fs');
const stream = fs.createWriteStream("assembly_with_nop.txt");

const ParseArquivo = () => {
	fs.readFile('assembly.txt', 'utf8', function(err, data) { 
<<<<<<< HEAD
		let lines = data.split('\n');
		var linesObj = [];
		lines.map(line => {
			line = line.replace(/\r/g, '');
			let regexp = /^(?:(?:(\w+)\:\t)|(?:\t\t))(\w{1,4})\t((?:\$\w+)|(?:\w+)|(?:\d))(?:\,((?:\$\w+)|(?:\w+)|(?:\d)))?(?:\,((?:\$\w+)|(?:\w+)|(?:\d)))?$/;
			let matches = regexp.exec(line);
			linesObj.push({
				linesItSelf : line,
				branch: matches ? matches[1] : '',  
				inst: matches ? matches[2] : '',
				parameters: matches ? matches.slice(3) : ''
			})
		});
		for(linesIndex in linesObj) {
			Intersection(linesObj[linesIndex], linesObj[parseInt(linesIndex) + 1], linesObj[parseInt(linesIndex) + 2]);
		}
=======
	let lines = data.split('\n');
	var linesObj = [];
	lines.map(line => {
		line = line.replace(/\r/g, '');
		let regexp = /^(?:(?:(\w+)\:\t)|(?:\t\t))(\w{1,4})\t((?:\$\w+)|(?:\w+)|(?:\d))(?:\,((?:\$\w+)|(?:\w+)|(?:\d)))?(?:\,((?:\$\w+)|(?:\w+)|(?:\d)))?$/;
		let matches = regexp.exec(line);
		linesObj.push({
			linesItSelf : line,
			branch: matches ? matches[1] : '',  
			inst: matches ? matches[2] : '',
			parameters: matches ? matches.slice(3) : ''
		})
		
	});

	for(linesIndex in linesObj) {
		WriteFile(linesObj[linesIndex]);
		let Nop = Intersection(linesObj[parseInt(linesIndex) - 1], linesObj[linesIndex]);
		WriteFile(Nop);
		let Nop2 = Intersection(linesObj[parseInt(linesIndex) - 2], linesObj[linesIndex]);
		WriteFile(Nop2);
	}

>>>>>>> f600ae962c0df9f39050f1c358f3b8f90ca6cb76
	});
}
ParseArquivo();

<<<<<<< HEAD
var Intersection = (line1, line2, line3) => {
	if(line2) {
		for(let lines of line2.parameters) {
			if(line1.inst == 'ADD' || line1.inst == 'SUB' || line1.inst == 'ADDI') {
				if(line1.parameters[0] == lines.parameters) {
					//console.log(line1.inst + ' tem conflito com ' + line2.inst); 
					WriteFile(true, line1.linesItSelf);
				}
				if(line1.parameters[0] != lines.parameters) {
					//console.log(line1.inst + ' tem conflito com ' + line2.inst); 
					WriteFile(false, line1.linesItSelf);
				}
			} else if(line1.inst == 'SW' || line1.inst == 'LW') {
				if(line1.parameters[1] == lines.parameters) {
					//console.log(line1.inst + ' tem conflito com ' + line2.inst);
					WriteFile(true, line1.linesItSelf);
				}
				if(line1.parameters[1] != lines.parameters) {
					//console.log(line1.inst + ' tem conflito com ' + line2.inst);
					WriteFile(false, line1.linesItSelf);
				}
				if(line1.parameters[2] == lines.parameters) {
					//console.log(line1.inst + ' tem conflito com ' + line2.inst);
					WriteFile(true, line1.linesItSelf);
				}
				if(line1.parameters[2] != lines.parameters) {
					//console.log(line1.inst + ' tem conflito com ' + line2.inst);
					WriteFile(false, line1.linesItSelf);
=======
var Intersection = (line1, line2) => {
	if(line2 && line1) {
		for(let parameter of line2.parameters) {
			if(line2.inst == 'ADD' || line2.inst == 'SUB' || line2.inst == 'ADDI'){

				if (line2.parameters[0] == parameter) {
					console.log(line1.inst + ' tem conflito com ' + line2.inst);
					return true;
				}					

			} else if(line2.inst == 'SW' || line2.inst == 'LW') {

				if (line2.parameters[1] == parameter) {
					console.log(line1.inst + ' tem conflito com ' + line2.inst);
					return true;
				}

				if (line2.parameters[2] == parameter) {
					console.log(line1.inst + ' tem conflito com ' + line2.inst);
					return true;
>>>>>>> f600ae962c0df9f39050f1c358f3b8f90ca6cb76
				}
			}	
		}
	}
<<<<<<< HEAD
	if(line3) {
		for(let lines2 of line3.parameters) {
			if(line1.inst == 'ADD' || line1.inst == 'SUB' || line1.inst == 'ADDI') {
				if(line1.parameters[0] == lines2.parameters) {
					//console.log(line1.inst + ' tem conflito com ' + line3.inst);
					WriteFile(true, line1.linesItSelf);
				}
				if(line1.parameters[0] != lines2.parameters) {
					//console.log(line1.inst + ' tem conflito com ' + line3.inst);
					WriteFile(false, line1.linesItSelf);
				}
			} else if(line1.inst == 'SW' || line1.inst == 'LW') {
				if(line1.parameters[1] == lines2.parameters) {
					//console.log(line1.inst + ' tem conflito com ' + line3.inst);
					WriteFile(true, line1.linesItSelf);
				}
				if(line1.parameters[1] != lines2.parameters) {
					//console.log(line1.inst + ' tem conflito com ' + line3.inst);
					WriteFile(false, line1.linesItSelf);
				}
				if(line1.parameters[2] == lines2.parameters) {
					//console.log(line1.inst + ' tem conflito com ' + line3.inst);
					WriteFile(true, line1.linesItSelf);
				}
				if(line1.parameters[2] != lines2.parameters) {
					//console.log(line1.inst + ' tem conflito com ' + line3.inst);
					WriteFile(false, line1.linesItSelf);
				}
			}
		}
	}
}

var WriteFile = (bool, lines) => {

	console.log(lines);
	
=======

}

var WriteFile = (line) => {
	let content = '';
	if(line) {
		if( typeof(line) ===  'boolean' ) {
			content = '\n\t\tnop\n\t\tnop';
		}
		if(typeof(line) !==  'boolean') {
			content = '\n' + line.linesItSelf;
		}
	}

	fs.appendFile('assembly_with_nop.txt', content, function (err) {
			if (err) throw err;
				console.log('Saved!');
	});
>>>>>>> f600ae962c0df9f39050f1c358f3b8f90ca6cb76
}
