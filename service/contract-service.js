const { web3, ERC20_CONTRACT } = require("../web3-connect");

class ContractService {
  constructor() {
    this.pubKey = "0x813F9c9080F800997195e9Ce996fD84342815e6B";
  }
  async getUserBalance(userAddress) {
    return await ERC20_CONTRACT.methods.balanceOf(userAddress).call();
  }
  async grantUser(toAddress, reward) {
    web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

    const tx = ERC20_CONTRACT.methods.transfer(toAddress, reward);
    const gas = await tx.estimateGas({ from: this.pubKey });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(this.pubKey);

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: ERC20_CONTRACT.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: 53,
      },
      process.env.PRIVATE_KEY
    );

    return await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  }
}

module.exports = new ContractService();
