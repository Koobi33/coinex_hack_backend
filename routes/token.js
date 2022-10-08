const Router = require("express").Router;
const authMiddleware = require("../middlewares/auth");
const { web3, ERC20_CONTRACT } = require("../web3-connect");

const router = new Router();

const pubKey = "0x813F9c9080F800997195e9Ce996fD84342815e6B";

const privateKey =
  "a97542abd0cbb89a2c38ad4cdbac0ab247e37f9390069e46076dd57e92503c2e";

const TEST_ADDRESS = "0x7F2F676F995eC8eceeC75e83417435D6190bdd53";

router.get("/total-supply", async (req, res) => {
  const res1 = await ERC20_CONTRACT.methods.totalSupply().call();
  console.log(res1);
  res.status(200).json(res1);
});

router.get("/balance/:address", async (req, res) => {
  const address = req.params.address;
  const res1 = await ERC20_CONTRACT.methods.balanceOf(address).call();
  console.log(res1);
  res.status(200).json(res1);
});

router.post("/send", async (req, res) => {
  const amount = req.body.amount;
  const toAddress = req.body.toAddress;

  web3.eth.accounts.wallet.add(privateKey);

  const tx = ERC20_CONTRACT.methods.transfer(toAddress, amount);
  const gas = await tx.estimateGas({ from: pubKey });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(pubKey);

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: ERC20_CONTRACT.options.address,
      data,
      gas,
      gasPrice,
      nonce,
      chainId: 53,
    },
    privateKey
  );

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  res.json(receipt);
});

module.exports = router;
