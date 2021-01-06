var election = artifacts.require('election'); // election.json 

module.exports=function(deployer) {
	deployer.deploy(election); // deploying the artifact of election
}
