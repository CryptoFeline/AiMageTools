// Import necessary libraries
import Web3 from 'https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js';
import Web3Modal from 'https://cdn.jsdelivr.net/npm/web3modal@latest';
import WalletConnectProvider from 'https://cdn.jsdelivr.net/npm/@walletconnect/web3-provider@latest';

// Web3Modal configuration
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "425e9e4db7894509a4dc5721e55b0aca"
    }
  }
};

const web3Modal = new Web3Modal({
  cacheProvider: false, // set to true to cache the chosen provider
  providerOptions // required
});

async function connectWallet() {
  try {
    // Open wallet selection modal
    const provider = await web3Modal.connect();

    // Subscribe to provider disconnection
    provider.on("disconnect", (error) => {
      console.log('Disconnected', error);
    });

    // Subscribe to provider connection
    provider.on("connect", (info) => {
      console.log('Connected', info);
    });

    // Create a Web3 instance
    const web3 = new Web3(provider);

    // Get list of accounts of the connected wallet
    const accounts = await web3.eth.getAccounts();

    // Use the primary account
    const userAddress = accounts[0];
    console.log("Wallet connected:", userAddress);

    // Define address of token
    const tokenContractAddress = '0x4872208C83acBfd7f6Dea5AA6CE6d5D7aED2AC1C';

    // Define ABI of the token
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

    // Call balanceOf function
    const balance = await tokenContract.methods.balanceOf(userAddress).call();

    // Assuming the balance is returned as an integer number of tokens
    if (parseInt(balance) > 1) {
        // The user has more than 1 token
        document.getElementById('landingPage').style.display = 'none';
        document.getElementById('imageGenInterface').style.display = 'block';
    } else {
        // The user does not have the required number of tokens - Show error page
        document.getElementById('errorMessage').style.display = 'block';
    }
  } catch (error) {
    console.error("Could not connect to wallet:", error);
    if(error.toString().includes('User Rejected')){
      alert("Connection to the wallet was rejected by the user.");
    } else {
      alert('Please install MetaMask or another compatible wallet to use this feature!');
    }
  }
}

// Event listeners
document.getElementById('connectWalletButton').addEventListener('click', connectWallet);
