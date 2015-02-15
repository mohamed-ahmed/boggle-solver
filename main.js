fs = require('fs');

fs.readFile('dictionary.txt', 'utf8', function (err, data){
	if(err){
		console.log(err);
		return;
	}
	var lineArray = data.split('\n');
	var wordArray = [];
	for(var i in lineArray){
		if(lineArray[i].length > 0)
			var word = lineArray[i].split(' ')[0];
			if(word.length > 2){
				wordArray.push(word);
			}
	}
	console.log(wordArray.length);
});