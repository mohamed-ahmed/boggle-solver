fs = require('fs');
var trie = new Trie();

var resultsList = [];

fs.readFile('dictionary.txt', 'utf8', function (err, data){
	if(err){
		console.log(err);
		return;
	}
	var lineArray = data.split('\n');
	var wordArray = [];
	for(var i in lineArray){
		if(lineArray[i].length > 0)
			var word = lineArray[i].split(' ')[0].toLowerCase();
		if(word.length > 2){
			//wordArray.push();
			trie.add(word);
		}
	}
	console.log(wordArray.length);
	console.log(trie.subKeys);
	console.log(trie.get('apex'));
	console.log(trie.get('ape'));
	console.log(trie.get('ap'));

	solve();

	console.log("resultsList");
	console.log(resultsList);

});

var puzzle = [
['f','x','i','e'],
['a','m','i','o'],
['e','w','l','x'],
['a','s','b','u']
];


function solve(){
	for(var r = 0; r < puzzle.length ; r++){
		for(var c = 0 ; c < puzzle[0].length ; c++){
			getWords(r,c, puzzle[r][c]);
			
		}
	}
}

function inBoundary(r,c){
	if(r >= 0 && r < puzzle.length && c >= 0 && c < puzzle[0].length){
		return true;
	}
	else{
		return false;
	}
}

function getWords(r, c, string){
	var offsetArray = [-1,0,1];
	console.log('getWords ' + string);
	if(trie.get(string) == 'word'){
		resultsList.push(string)
	}
	if(trie.get(string) != 'prefix' && trie.get(string) != 'word' ){
		return;
	}
	for( var rOffset in offsetArray){
		var rIndex = r + offsetArray[rOffset];
		for(var cOffset in offsetArray){
			var cIndex = c + offsetArray[cOffset];
			if( !(rIndex == 0 && cIndex == 0) && inBoundary(rIndex, cIndex)){
				console.log("indexes: " + rIndex + "," + cIndex);
				getWords(rIndex, cIndex, string + puzzle[rIndex][cIndex]);
			}
		}
	}
}














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
			this.subKeys[string[0]].value = 'prefix';
		}
		else{
			this.subKeys[string[0]].value = 'word';
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