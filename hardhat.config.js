require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 //rinkeby_testnetへのデプロイ
module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      //AlchemyのAPI_KEY
      url: "https://eth-rinkeby.alchemyapi.io/v2/v_jRubQc_-HlfjxrWz1SJXHMiLSPjre_",
      //WalletのPRIVATE_KEYと
      accounts: ["0e7006933b629709a31d4695f9fd1560bb10c052dee2de654b5c5b90cf6b97a0"],
    },
  },
};
