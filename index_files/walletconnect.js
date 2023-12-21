document.addEventListener('DOMContentLoaded', function() {
    const projectId = '425e9e4db7894509a4dc5721e55b0aca'; // Your Infura Project ID
  
    // Web3Modal instance
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: false, // optional
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: projectId, // required
          },
        },
      },
    });
  
    async function connectWallet() {
      try {
        // Open the connect modal
        const provider = await web3Modal.connect();
  
        // Create web3 instance
        const web3 = new Web3(provider);
  
        // Get connected accounts
        const accounts = await web3.eth.getAccounts();
        console.log("Wallet connected:", accounts);  
  
        const tokenContractAddress = '0x4872208C83acBfd7f6Dea5AA6CE6d5D7aED2AC1C';
        const userAddress = accounts[0];
  
        // Define the ABI of the token contract
        const tokenContractABI = [
          {
            "constant": true,
            "inputs": [{"name": "_owner", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"name": "balance", "type": "uint256"}],
            "type": "function"
          }
        ];
  
        // Create contract instance
        const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
  
        // Call the balanceOf function from the contract
        const balance = await tokenContract.methods.balanceOf(userAddress).call();
  
        // Assuming the balance is returned as an integer number of tokens
        if (parseInt(balance) > 1) {
          document.getElementById('landingPage').style.display = 'block';
          document.getElementById('imageGenInterface').style.display = 'block';
        } else {
          document.getElementById('errorMessage').style.display = 'block';
        }
  
    } catch (error) {
        console.error("Could not connect to wallet:", error);
        document.getElementById('errorMessage').innerHTML = "Error connecting to wallet: " + error.message;
        document.getElementById('errorMessage').style.display = 'block';
      }
    }
  
    // Event listeners
    document.getElementById('open-connect-modal').addEventListener('click', connectWallet);
  });