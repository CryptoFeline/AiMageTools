import { mainnet } from 'https://cdn.skypack.dev/@wagmi/core@latest/chains';
import { createWeb3Modal, defaultWagmiConfig } from 'https://cdn.skypack.dev/@web3modal/wagmi';

const projectId = '425e9e4db7894509a4dc5721e55b0aca';
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

// Define the chains you want to support
const chains = [mainnet];

// Create the wagmiConfig
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'AiMage Studio',
    description: 'Welcome to our innovative AI design generation platform.',
    url: 'https://aimagetools.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }
});

// Create the modal
const modal = createWeb3Modal({ wagmiConfig, projectId, chains, themeMode: 'dark' });

// Function to open the connect modal
async function connectWallet() {
    try {
        // Open the connect modal
        const connection = await modal.open();
        
        // Connection is successful
        console.log("Wallet connected:", connection);

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
            document.getElementById('errorMessage').style.display = 'block';
        }

    } catch (error) {
        // Handle errors, such as user closing the modal
        console.error("Could not connect to wallet:", error);
    }
}

// Event listeners
document.getElementById('open-connect-modal').addEventListener('click', connectWallet);
