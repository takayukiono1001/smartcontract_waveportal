//hardhat
  //ローカルのブロックチェーンネットワーク、及びsolidity用の開発環境
  //"npx hardhat node"はローカルのネットワークを作成
  //"npx hardhat run scripts/deploy.ts --network localhost"はローカルのネットワークにスクリプトをデプロイ

//Why compile？（ネットワークへのデプロイ時に自動的にコンパイルされる）
  //・・・①Solidity の実行環境になる EVM で動かすための bytecode、②スマートコントラクトを利用するアプリケーションがコントラクトの機能を利用するためのJSONファイル[.json]
  //・・・JSONファイルは自動的にartifacts配下に格納される（フロントエンド開発時に必要なファイル）

//Alcamy
  //実際のブロックチェーンにデプロイさせてくれるツール

  const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    console.log("Contract addy:", waveContract.address);
  
    let contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );
  
    /*
     * Let's try two waves now
     */
    const waveTxn = await waveContract.wave("This is wave #1");
    await waveTxn.wait();
  
    const waveTxn2 = await waveContract.wave("This is wave #2");
    await waveTxn2.wait();
  
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );
  
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();