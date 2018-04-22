//Requires node.js with web3

var Web3 = require('web3');
const readline = require('readline');
var _parentAddress = '0x96164079bf312E80e061b226ccF27f143cf3f3ff';
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var libraryABI = [{"name": "Donation", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "int128", "name": "_value", "indexed": false}, {"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "BookUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "TextUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "getBookAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "bookID"}], "constant": true, "payable": false, "type": "function", "gas": 672}, {"name": "addBook", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "bookAddress"}], "constant": false, "payable": false, "type": "function", "gas": 21976}, {"name": "getAuthorAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "authorID"}], "constant": true, "payable": false, "type": "function", "gas": 732}, {"name": "addAuthor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "authorAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22036}, {"name": "getSubjectAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "subjectID"}], "constant": true, "payable": false, "type": "function", "gas": 792}, {"name": "getLoCAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "LoCID"}], "constant": true, "payable": false, "type": "function", "gas": 822}, {"name": "__init__", "outputs": [], "inputs": [{"type": "address[3]", "name": "_foundationAddresses"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "changeFoundationAddresses", "outputs": [], "inputs": [{"type": "int128", "name": "index"}, {"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22280}, {"name": "donate", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}], "constant": false, "payable": true, "type": "function", "gas": 41411}, {"name": "donateWithDifferentDonor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}, {"type": "address", "name": "donorAddress"}], "constant": false, "payable": true, "type": "function", "gas": 41386}, {"name": "setUpdateAddress", "outputs": [], "inputs": [{"type": "address", "name": "newUpdateAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22039}, {"name": "setTextAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "textAddress"}], "constant": false, "payable": false, "type": "function", "gas": 6101}, {"name": "setExpansionAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 4781}, {"name": "foundationAddresses", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1060}, {"name": "updateAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 873}, {"name": "updatedContract", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 903}, {"name": "books", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1122}, {"name": "authors", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1152}, {"name": "subjects", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1182}, {"name": "LoC", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1212}];

var libraryCode = '0x600035601c52740100000000000000000000000000000000000000006020526f7fffffffffffffffffffffffffffffff6040527fffffffffffffffffffffffffffffffff8000000000000000000000000000000060605274012a05f1fffffffffffffffffffffffffdabf41c006080527ffffffffffffffffffffffffed5fa0e000000000000000000000000000000000060a0526060610f0a6101403934156100a757600080fd5b6020610f0a60c03960c05160205181106100c057600080fd5b5060206020610f0a0160c03960c05160205181106100dd57600080fd5b5060206040610f0a0160c03960c05160205181106100fa57600080fd5b50600060c052602060c02061014080600060200201516000830155806001602002015160018301558060026020020151600283015550506000600255610ef256600035601c52740100000000000000000000000000000000000000006020526f7fffffffffffffffffffffffffffffff6040527fffffffffffffffffffffffffffffffff8000000000000000000000000000000060605274012a05f1fffffffffffffffffffffffffdabf41c006080527ffffffffffffffffffffffffed5fa0e000000000000000000000000000000000060a05263ba7b7a6d60005114156100eb57602060046101403734156100b457600080fd5b606051600435806040519013585780919012156100d057600080fd5b5061014051600360c052602060c020015460005260206000f3005b63183ca6af60005114156101aa576040600461014037341561010c57600080fd5b6060516004358060405190135857809190121561012857600080fd5b50602435602051811061013a57600080fd5b5060006101805261018061010060006003818352015b61010051600060c052602060c02001543314156101705760018352610181565b5b8151600101808352811415610150575b5050506101805160011461019457600080fd5b6101605161014051600360c052602060c0200155005b6314522597600051141561020257602060046101403734156101cb57600080fd5b606051600435806040519013585780919012156101e757600080fd5b5061014051600460c052602060c020015460005260206000f3005b630866cf4560005114156102c1576040600461014037341561022357600080fd5b6060516004358060405190135857809190121561023f57600080fd5b50602435602051811061025157600080fd5b5060006101805261018061010060006003818352015b61010051600060c052602060c02001543314156102875760018352610298565b5b8151600101808352811415610267575b505050610180516001146102ab57600080fd5b6101605161014051600460c052602060c0200155005b6330a99164600051141561031957602060046101403734156102e257600080fd5b606051600435806040519013585780919012156102fe57600080fd5b5061014051600560c052602060c020015460005260206000f3005b63ed1e3fed6000511415610371576020600461014037341561033a57600080fd5b6060516004358060405190135857809190121561035657600080fd5b5061014051600660c052602060c020015460005260206000f3005b63a8d4dbaf6000511415610457576040600461014037341561039257600080fd5b606051600435806040519013585780919012156103ae57600080fd5b5060243560205181106103c057600080fd5b5060006101805261018061010060006003818352015b61010051600060c052602060c02001543314156103f65760018352610407565b5b81516001018083528114156103d6575b5050506101805160011461041a57600080fd5b600261014051131560006101405112151661043457600080fd5b61016051610140516003811061044957600080fd5b600060c052602060c0200155005b638bd942d8600051141561067f5760606004610140376060516004358060405190135857809190121561048957600080fd5b50606051602435806040519013585780919012156104a657600080fd5b50606051604435806040519013585780919012156104c357600080fd5b50610180516101605113156104d757600080fd5b6002541561053a576001543b6104ec57600080fd5b6001543014156104fb57600080fd5b600060006064638bd942d861028052610140516102a052610160516102c052610180516102e05261029c60006001545af161053557600080fd5b61067d565b6402540be400600160a051610180518061055357600080fd5b6402540be4006060516101605134028060405190135857809190121561057857600080fd5b02058060805190135857809190121561059057600080fd5b02046101a05260006000600060006101a0516000600060c052602060c02001546000f16105bc57600080fd5b61014051600360c052602060c02001543b6105d657600080fd5b61014051600360c052602060c02001543014156105f257600080fd5b600060006024636237dd9c6101c0526060516101a05160013402038060405190135857809190121561062357600080fd5b6101e0526101dc600061014051600360c052602060c02001545af161064757600080fd5b34610240526101405161026052337f1e4e27e3d0ff7c90c9293487ee3fb6a47e0730e22d8c169e25abcdd34b6c8c196040610240a25b005b635615fbb860005114156108b1576080600461014037606051600435806040519013585780919012156106b157600080fd5b50606051602435806040519013585780919012156106ce57600080fd5b50606051604435806040519013585780919012156106eb57600080fd5b5060643560205181106106fd57600080fd5b5060025415610769576001543b61071357600080fd5b60015430141561072257600080fd5b600060006084635615fbb86102a052610140516102c052610160516102e05261018051610300526101a051610320526102bc60006001545af161076457600080fd5b6108af565b6402540be400600160a051610180518061078257600080fd5b6402540be400606051610160513402806040519013585780919012156107a757600080fd5b0205806080519013585780919012156107bf57600080fd5b02046101c05260006000600060006101c0516000600060c052602060c02001546000f16107eb57600080fd5b61014051600360c052602060c02001543b61080557600080fd5b61014051600360c052602060c020015430141561082157600080fd5b600060006024636237dd9c6101e0526060516101c05160013402038060405190135857809190121561085257600080fd5b610200526101fc600061014051600360c052602060c02001545af161087657600080fd5b346102605261014051610280526101a0517f1e4e27e3d0ff7c90c9293487ee3fb6a47e0730e22d8c169e25abcdd34b6c8c196040610260a25b005b631a9faa80600051141561094657602060046101403734156108d257600080fd5b60043560205181106108e357600080fd5b5060006101605261016061010060006003818352015b61010051600060c052602060c0200154331415610919576001835261092a565b5b81516001018083528114156108f9575b5050506101605160011461093d57600080fd5b61014051600155005b634e087e746000511415610a8d576040600461014037341561096757600080fd5b6060516004358060405190135857809190121561098357600080fd5b50602435602051811061099557600080fd5b5060006101805261018061010060006003818352015b61010051600060c052602060c02001543314156109cb57600183526109dc565b5b81516001018083528114156109ab575b505050610180516001146109ef57600080fd5b61014051600360c052602060c02001543b610a0957600080fd5b61014051600360c052602060c0200154301415610a2557600080fd5b60006000602463218e13b76101a052610160516101c0526101bc600061014051600360c052602060c02001545af1610a5c57600080fd5b61014051610220527f06dee5cfead0cfc8daa402069e1fa42fd9cdf46ce4d1211c43c5381c416c95f26020610220a1005b637b3a58eb6000511415610ba55760406004610140373415610aae57600080fd5b60605160043580604051901358578091901215610aca57600080fd5b506024356020518110610adc57600080fd5b5060006101805261018061010060006003818352015b61010051600060c052602060c0200154331415610b125760018352610b23565b5b8151600101808352811415610af2575b50505061018051600114610b3657600080fd5b61014051600360c052602060c02001543b610b5057600080fd5b61014051600360c052602060c0200154301415610b6c57600080fd5b60006000602463e74637956101a052610160516101c0526101bc600061014051600360c052602060c02001545af1610ba357600080fd5b005b638a1a5b6e6000511415610c0a5760206004610140373415610bc657600080fd5b60605160043580604051901358578091901215610be257600080fd5b506101405160038110610bf457600080fd5b600060c052602060c020015460005260206000f3005b63d59768a36000511415610c30573415610c2357600080fd5b60015460005260206000f3005b63126f30206000511415610c56573415610c4957600080fd5b60025460005260206000f3005b636c578b716000511415610cae5760206004610140373415610c7757600080fd5b60605160043580604051901358578091901215610c9357600080fd5b5061014051600360c052602060c020015460005260206000f3005b6381a7212d6000511415610d065760206004610140373415610ccf57600080fd5b60605160043580604051901358578091901215610ceb57600080fd5b5061014051600460c052602060c020015460005260206000f3005b63177f8fb96000511415610d5e5760206004610140373415610d2757600080fd5b60605160043580604051901358578091901215610d4357600080fd5b5061014051600560c052602060c020015460005260206000f3005b6359315b8e6000511415610db65760206004610140373415610d7f57600080fd5b60605160043580604051901358578091901215610d9b57600080fd5b5061014051600660c052602060c020015460005260206000f3005b5b61013b610ef20361013b60003961013b610ef2036000f3';

function launchContract(password) {
	web3.eth.getBalance(_parentAddress).then(console.log);
	web3.eth.personal.unlockAccount(_parentAddress, password).then(function(){

		var currentContract = new web3.eth.Contract(libraryABI);
		var gasEstimate;

		currentContract.deploy({
			data: libraryCode,
			arguments: [[_parentAddress, _parentAddress, _parentAddress]]
		})
		.estimateGas(function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
		}).then(function(){

			currentContract.deploy({
				data: libraryCode,
				arguments: [[_parentAddress, _parentAddress, _parentAddress]]
			})
			.send({
				from: _parentAddress,
				gas: gasEstimate,
				gasPrice: '4000000000'
			},
			function(error, transactionHash){})
			.on('error', function(error){ console.log(error); })
			.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
			.on('receipt', function(receipt){
				
			})
			.on('confirmation', function(confirmationNumber, receipt){
			})
			.then(function(newContractInstance){
				console.log(newContractInstance.options.address); // instance with the new contract address
			});
		});
	});
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input password: ', (answer) => {
	launchContract(answer);
	rl.close();
});