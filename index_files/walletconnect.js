document.addEventListener('DOMContentLoaded', function() {
    const projectId = '425e9e4db7894509a4dc5721e55b0aca'; // Replace with your actual project ID
    if (!projectId) {
      throw new Error('VITE_PROJECT_ID is not set');
    }
  
    // Connect Wallet Modal elements
    const connectWalletModal = document.getElementById('connectWalletModal');
    const connectMetamaskButton = document.getElementById('connectMetamask');
    const connectWalletConnectButton = document.getElementById('connectWalletConnect');
  
    // Function to show the connect wallet modal
    function openConnectWalletModal() {
      connectWalletModal.style.display = 'flex';
    }
  
    // Function to close the modal
    function closeModal() {
      connectWalletModal.style.display = 'none';
    }
  
    // MetaMask Connection
    connectMetamaskButton.addEventListener('click', async function() {
        closeModal(); // Close the modal when user chooses an option
        if (window.ethereum && window.ethereum.isMetaMask) {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Handle the accounts changed (function defined elsewhere in your script)
            handleAccountsChanged(accounts);
        } catch (error) {
            // Handle errors like user denying account access
            console.error("User denied account access or error occurred:", error);
        }
        } else {
        // Alert the user if MetaMask is not installed
        alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
        }
    });
  
    // WalletConnect Connection
    connectWalletConnectButton.addEventListener('click', async function() {
      const provider = new WalletConnectProvider.default({
        infuraId: projectId, // use your projectId as the Infura ID
        rpc: {1: "https://mainnet.infura.io/v3/" + projectId}
      });
  
      try {
        const accounts = await provider.enable();
        handleAccountsChanged(accounts);
      } catch (error) {
        console.error("WalletConnect connection failed", error);
      }
    });
  
    // Handle account changes and perform actions based on the connected account
    async function handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        console.log('Please connect to a wallet.');
      } else {
        const web3 = new Web3(window.ethereum || provider);
        const userAddress = accounts[0];
        console.log('Connected accounts:', accounts);
  
        // Specify your contract's details
        const tokenContractAddress = '0x4872208C83acBfd7f6Dea5AA6CE6d5D7aED2AC1C';
        const tokenContractABI = [
          {
            "constant": true,
            "inputs": [{"name": "_owner", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"name": "balance", "type": "uint256"}],
            "type": "function"
          }
        ];
  
        // Create contract instance and interact with it
        const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
        try {
          const balance = await tokenContract.methods.balanceOf(userAddress).call();
          if (parseInt(balance) > 1) {
            document.getElementById('landingPage').style.display = 'none';
            document.getElementById('imageGenInterface').style.display = 'block';
          } else {
            document.getElementById('errorMessage').style.display = 'block';
          }
        } catch (error) {
          console.error("Error interacting with the contract:", error);
          document.getElementById('errorMessage').innerHTML = "Error interacting with the contract: " + error.message;
          document.getElementById('errorMessage').style.display = 'block';
        }
      }
      closeModal();
    }
  
    // Event listener for opening connect wallet modal
    document.getElementById('open-connect-modal').addEventListener('click', openConnectWalletModal);
  });
  