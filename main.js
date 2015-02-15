fs = require('fs');
var trie = new Trie();

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
				trie.add(word);
			}
	}
	console.log(wordArray.length);
	console.log(trie.subKeys);
});



















/**
 * Writing and testing a Trie Data Structure in JavaScript
 */

 function Trie(){
 	this.subKeys = {};
 	this.key = null;
 }

 Trie.prototype.add = function(string) {

 	var keySet = Object.keys(this.subKeys);
 	var remainderString = string.slice(1);
 	
	//if this node contrains a subKey which starts
	//with this string, add it to that subtree
	if(keySet.indexOf(string[0]) >= 0 ){
		this.subKeys[string[0]].add(remainderString);
	}
	//if it doesn't contain this subtree, add it
	else{
		this.subKeys[string[0]] = new Trie();
		this.subKeys[string[0]].key = string[0];
		if(remainderString.length > 0){
			this.subKeys[string[0]].add(remainderString);
		}
		else{
			this.subKeys[string[0]].value = true;
		}
	}

};

Trie.prototype.get = function(string){

	for(var i in Object.keys(this.subKeys) ){
		var charKey = Object.keys(this.subKeys)[i];
		if( charKey == string[0] ){
			var remainderString = string.slice(1);
			var subtree = this.subKeys[charKey];
			if(string.length == 1){
				return subtree.value
			}
			else{
				return (subtree.get(remainderString));
			}
		}
	}
	return false;

}