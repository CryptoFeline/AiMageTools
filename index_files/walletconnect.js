
import WalletConnectProvider from 'https://unpkg.com/@walletconnect/web3-provider@latest/dist/umd/index.min.js';
import QRCodeTerminal from "qrcode-terminal";
import Web3 from "web3";

async function connectWallet() {
    // Create an instance of WalletConnectProvider
    const provider = new WalletConnectProvider({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModalOptions: {
            mobileLinks: [
                "trust://",
                "metamask://",
                "https://metamask.app.link/send"
            ],
        },
    });

    try {
        // Enable session (triggers QR Code modal)
        await provider.enable();

        // Create a new Web3 instance
        const web3 = new Web3(provider);

        // Get accounts
        const accounts = await web3.eth.getAccounts();
        console.log("Wallet connected:", accounts[0]);

        // Define the address of token
        const tokenContractAddress = '0x4872208C83acBfd7f6Dea5AA6CE6d5D7aED2AC1C';
        const userAddress = accounts[0];

        // Define the ABI of the token contract
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
        // Handle errors if connection fails
        console.error("Could not connect to wallet:", error);
    }

    // Disconnect handling
    provider.on("disconnect", (code, reason) => {
        console.log(code, reason);
        // Handle disconnect logic
    });
}

// Event listener remains the same
document.getElementById('connectWalletButton').addEventListener('click', connectWallet);
