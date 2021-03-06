//Requires node.js
//Deployment Code:

var path = require('path');
var fs = require('fs');
const readline = require('readline');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var totalGas = 0;
var bookAddress;

var _parentAddress = '0x240Ffc557848b5a28bB2df8370B35e7a1B35797D';
var _senderAddress = '0x8378C65a0c83675AcF509fF3F9f48DEC7898EEbA';
var _parentABI = [{"name": "Donation", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "int128", "name": "_value", "indexed": false}, {"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "BookUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "TextUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "getTextAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "bookID"}], "constant": true, "payable": false, "type": "function", "gas": 672}, {"name": "getBookAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "bookID"}], "constant": true, "payable": false, "type": "function", "gas": 702}, {"name": "addBook", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "bookAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22006}, {"name": "getAuthorAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "authorID"}], "constant": true, "payable": false, "type": "function", "gas": 762}, {"name": "addAuthor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "authorAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22066}, {"name": "getSubjectAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "subjectID"}], "constant": true, "payable": false, "type": "function", "gas": 822}, {"name": "getLoCAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "LoCID"}], "constant": true, "payable": false, "type": "function", "gas": 852}, {"name": "__init__", "outputs": [], "inputs": [{"type": "address[3]", "name": "_foundationAddresses"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "changeFoundationAddresses", "outputs": [], "inputs": [{"type": "int128", "name": "index"}, {"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22310}, {"name": "donate", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}], "constant": false, "payable": true, "type": "function", "gas": 41441}, {"name": "donateWithDifferentDonor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}, {"type": "address", "name": "donorAddress"}], "constant": false, "payable": true, "type": "function", "gas": 41416}, {"name": "setUpdateAddress", "outputs": [], "inputs": [{"type": "address", "name": "newUpdateAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22069}, {"name": "setTextAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "_textAddress"}], "constant": false, "payable": false, "type": "function", "gas": 26206}, {"name": "setExpansionAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 4811}, {"name": "withdrawFunds", "outputs": [], "inputs": [{"type": "int128", "name": "bookID"}, {"type": "address", "name": "withdrawalAddress"}, {"type": "int128", "name": "withdrawal"}], "constant": false, "payable": false, "type": "function", "gas": 37445}, {"name": "setMaxIndex", "outputs": [], "inputs": [{"type": "int128", "name": "_maxIndex"}], "constant": false, "payable": false, "type": "function", "gas": 22240}, {"name": "foundationAddresses", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1150}, {"name": "maxIndex", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 963}, {"name": "updateAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 993}, {"name": "updatedContract", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1023}, {"name": "books", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1242}, {"name": "textAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1272}, {"name": "authors", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1302}, {"name": "subjects", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1332}, {"name": "LoC", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1362}];

//CHANGE BOOK ID HERE |							<--------
var bookID = 11;//<----/        <------
//DON'T FORGET MOTHERFUCKER				<-----

var fileLoc = '/Users/us.tropers/Desktop/Prepped/Full Texts/' + bookID.toString() + '/';

//need to create files var
var files = fs.readdirSync(fileLoc);

//gets byte files
var byteExtension = '.byte';
var byteFiles = files.filter(function(file) {
	return path.extname(file).toLowerCase() === byteExtension;
});

//gets abi files
var abiExtension = '.json';
var abiFiles = files.filter(function(file) {
	return path.extname(file).toLowerCase() === abiExtension;
});

//gets zip bytes files
var zbExtension = '.zb';
var zbFiles = files.filter(function(file) {
	return path.extname(file).toLowerCase() === zbExtension;
});

console.log(zbFiles);

var abiFile;



function prepFile(){
	
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.question('Input password: ', (answer) => {
		deployContract(answer);
		rl.close();
	});
}

function deployContract(password){
	_password = password;
	web3.eth.personal.unlockAccount(_senderAddress, _password).then(function(){
		deployBookContract();																		
	});
}

var deployed = false;

function deployBookContract(){
	web3.eth.personal.unlockAccount(_senderAddress, _password);
	var currentContract = new web3.eth.Contract(abiFile);
	var gasEstimate;
	if(zbFiles.length == 1){
		currentContract.deploy({
			data: byteFile,
			arguments: [_parentAddress]
		})
		.estimateGas(function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
			totalGas += gas;
		}).then(function(){
			currentContract.deploy({
				data: byteFile,
				arguments: [_parentAddress]
			})
			.send({
				from: _senderAddress,
				gas: gasEstimate,
			},
			function(error, transactionHash){})
			.on('error', function(error){ console.log('Error: ' + error); })
			.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
			.on('receipt', function(receipt){
				console.log('Stored book at address: ' + receipt.contractAddress);
				bookAddress = receipt.contractAddress;
				deployed = true;
				web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
				web3.eth.personal.unlockAccount(_senderAddress, _password).then(function(){
					updateLibrary();
				});
			});
		});
	}
	else{
		currentContract.deploy({
			data: byteFile,
			arguments: [_parentAddress, _senderAddress]
		})
		.estimateGas(function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
			totalGas += gas;
		}).then(function(){
			currentContract.deploy({
				data: byteFile,
				arguments: [_parentAddress, _senderAddress]
			})
			.send({
				from: _senderAddress,
				gas: gasEstimate,
			},
			function(error, transactionHash){})
			.on('error', function(error){ console.log('Error: ' + error); })
			.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
			.on('receipt', function(receipt){
				bookAddress = receipt.contractAddress;
				console.log('Stored book at address: ' + receipt.contractAddress);
				deployed = true;
				web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
				web3.eth.personal.unlockAccount(_senderAddress, _password).then(function(){
					addZips(bookAddress, 0);
				});
			});
		});
	}
}

var zipsStored = 0;

function addZips(address, fileIndex){
	if (fileIndex+1 != zbFiles.length) {
		web3.eth.personal.unlockAccount(_senderAddress, _password);
		var currContract = new web3.eth.Contract(abiFile, address);
		var currCall = currContract.methods.setZipBytes(fileIndex, processedFiles[fileIndex]);
		var gasEstimate;
		currCall.estimateGas({from: _senderAddress}, function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
			totalGas += gas;
		}).then(function(){
			currCall.send({from: _senderAddress, gas: gasEstimate})
			.on('error', function(error){ console.log('Error: ' + error); })
			.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
			.on('receipt', function(receipt){
				console.log('Stored zb file ' + fileIndex);
				zipsStored++;
			})
			waitThenStoreMore(address, fileIndex+1)
		});
	}
	else {
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		web3.eth.personal.unlockAccount(_senderAddress, _password).then(function(){
			updateLibrary();
		});
	}
}

function waitThenStoreMore(address, nextIndex){
	if (zipsStored == nextIndex){
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		web3.eth.personal.unlockAccount(_senderAddress, _password).then(function(){
			addZips(address, nextIndex);
		});
	} else {
		setTimeout(function(){waitThenStoreMore(address, nextIndex);}, 100);
	}
}

var updated = 0;
var updatedLib = false;

function updateLibrary(){
	var libraryContract = new web3.eth.Contract(_parentABI, _parentAddress);
	var currentCall = libraryContract.methods.setTextAddress(bookID, bookAddress);
	var gasEstimate;
	currentCall.estimateGas({from: _senderAddress}, function(err, gas){
		console.log('Gas Estimate: ' + gas);
		gasEstimate = gas;
		totalGas += gas;
	}).then(function(){
		currentCall.send({from: _senderAddress, gas: gasEstimate})
		.on('error', function(error){ console.log('Error: ' + error); })
		.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
		.on('receipt', function(receipt){
			updated++;
		});
		waitThenDone();
	});
}

function waitThenAddZips(){
	web3.eth.personal.unlockAccount(_senderAddress, _password);
	if (!deployed){
		setTimeout(function(){waitThenAddZips();}, 100);
	}
}

function waitThenUpdateLibrary(){
	web3.eth.personal.unlockAccount(_senderAddress, _password);
	if (zipsStored == zbFiles.length){
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		web3.eth.personal.unlockAccount(_senderAddress, _password).then(function(){
			updateLibrary();
		});
	} else {
		setTimeout(function(){waitThenUpdateLibrary();}, 100);
	}
}

function waitThenDone(){
	if (updated==1){
		console.log('Done!!!')
		console.log(bookAddress);
		console.log("Total gas: " + totalGas)
	} else {
		setTimeout(function(){waitThenDone();}, 100);
	}
}

var _password
var byteFile;
var processedFiles = [];

function processZB(index){
	if(index < zbFiles.length){
		fs.readFile(fileLoc + zbFiles[index], function(err, data){
			var result = '0x' + data.toString('hex');
			processedFiles.push(result);
			processZB(index+1);
		});
	}
	else{
		proceed();
	}
}

function proceed(){
	fs.readFile(fileLoc + byteFiles[0], 'utf-8', function(err, data){
		byteFile = data.trim();
		fs.readFile(fileLoc + abiFiles[0], 'utf-8', function(err, data2){
			abiFile = JSON.parse(data2);
			console.log(abiFile);
			prepFile();
		});
	});
}

processZB(0);