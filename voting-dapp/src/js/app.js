App = {
	web3Provider: null,
	contracts: {},

	init: async function() {
		return await App.initWeb3(); // web3 is api to invoke your smart contract
	}, // press button -> Metamask -> Ganache -> Smart Contract

	initWeb3: async function() {

		if(window.web3) { // true
			App.web3Provider = window.web3.currentProvider; // metamask
		}
		else { // dont have Metamask, directly it will send a request to ganache
			App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
		}

		web3 = new Web3(App.web3Provider); // identifying Metamask
		return App.initContract(); // through the artifact
	},

	initContract: function() {

		$.getJSON('election.json',function(data){

			var electionArtifact = data;
			App.contracts.election = TruffleContract(electionArtifact); // contract
			App.contracts.election.setProvider(App.web3Provider); // provider (metamask)

			return App.displayVotes();
		});
			return App.bindEvents();
	},
	
	bindEvents: function() {
		$(document).on('click', '.btn-vote', App.handleVote);
	},

	displayVotes: function() {

		var electionInstance; // to connect with metamask (ganache)

		App.contracts.election.deployed().then(function(instance){ // election is deployed

			electionInstance=instance; // it will take that instance
			return electionInstance.viewVote.call(); // making the contract call

		}).then(function(votes){ // votes which is returned from the contract
			
			document.getElementById('v1').innerHTML = votes[0]['c'][0];
			document.getElementById('v2').innerHTML = votes[1]['c'][0];
			document.getElementById('v3').innerHTML = votes[2]['c'][0];

		}).catch(function(err){
			console.log(err.message); // error
		});
	},

	handleVote: function(event) {
		event.preventDefault();

		var electionInstance;
		var Id = parseInt($(event.target).data('id')); // data - id

		web3.eth.getAccounts(function(error,accounts){
			if(error){
				console.log(error);
			}
			var account=accounts[0]; // account (which wallet address)
			console.log(account);

			App.contracts.election.deployed().then(function(instance){ // election is deployed
				
				electionInstance=instance;
				return electionInstance.castVote(Id,{from:account}); // contract function

			}).then(function(result){
				console.log(account);
				document.getElementById('add').innerHTML = account;
				return App.displayVotes();
			
			}).catch(function(err){
				console.log(err.message);
			});

		});
	}

};

// this function will be called automatically when you load your HTML Page
$(function() {
	$(window).load(function() {
		App.init();
	});
});
