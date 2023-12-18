import Web3 from 'https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js';

async function connectWallet() {
    if (window.ethereum) { // Check if MetaMask is installed
        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Connected successfully
            console.log("Wallet connected:", accounts[0]); // Assuming we use the first account

            // Create a new Web3 instance
            const web3 = new Web3(window.ethereum);

            // Define the address of the token contract and the wallet address
            const tokenContractAddress = '0x4872208C83acBfd7f6Dea5AA6CE6d5D7aED2AC1C';
            const userAddress = accounts[0];

            // Define the ABI (Application Binary Interface) of the token contract
            const tokenContractABI = [
                // balanceOf function ABI
                {
                    "constant": true,
                    "inputs": [{"name": "_owner", "type": "address"}],
                    "name": "balanceOf",
                    "outputs": [{"name": "balance", "type": "uint256"}],
                    "type": "function"
                }];

            // Create contract instance
            const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);

            // Call the balanceOf function from the contract
            const balance = await tokenContract.methods.balanceOf(userAddress).call();

            // Assuming the balance is returned as an integer number of tokens
            if (parseInt(balance) > 1) {
                // The user has more than 1 token
                document.getElementById('landingPage').style.display = 'none';
                document.getElementById('imageGenInterface').style.display = 'block';
            } else {
                // The user does not have the required number of tokens - Show error page
                document.getElementById('landingPage').style.display = 'none';
                document.getElementById('errorPage').style.display = 'block';
            }
        } catch (error) {
            // User denied account access or some other error occurred
            console.error("Could not connect to wallet:", error);
        }
    } else {
        // MetaMask is not installed
        alert('Please install MetaMask to use this feature!');
    }
}

// Event listeners
document.getElementById('connectWalletButton').addEventListener('click', connectWallet);