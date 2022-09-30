const Web3 = require("web3");

const myProvider =
  Web3.givenProvider ||
  new Web3.providers.HttpProvider("https://testnet.aurora.dev");
const web3 = new Web3(myProvider);

module.exports = {
  myProvider,
  web3,
};
