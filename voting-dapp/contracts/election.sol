pragma solidity 0.5.16; // compiler version (replace your compiler version)

contract election { // creating a contract
	uint[3] private votes; // state variable, holding the number of votes casted
	mapping(address => bool) public voters;
	// if the voter casted their vote, assign the address to True
	// Truth Table
	// address (col1), status (col2)
	// storing the wallet addres (voter), True 

	constructor() public { // when a smart contract is deployed, immediately
		votes[0]=0; // first contestant - id as 0
		votes[1]=0; // second contestant - id as 1
		votes[2]=0; // third contestant - id as 2
	}
	
	function castVote(uint id) public { // to cast a vote for their fav contestant

		require(!voters[msg.sender]); // throws exception
		// msg.sender is a global variable, wallet address

		voters[msg.sender]=true;		
		
		if(id==0) {
			votes[0]+=1;	// first contestant
		} else if(id==1) {
			votes[1]+=1; // second
		} else if(id==2) {
			votes[2]+=1; // third
		}
	}
	
	function viewVote() public view returns(uint[3] memory) { // result
		return(votes); // votes is array, 0, 1, 2 
	}
}
