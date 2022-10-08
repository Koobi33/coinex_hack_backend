const ContractService = require("../service/contract-service");

class ContractController {
  async getUserBalance(req, res, next) {
    const wallet = req.params.id;
    const balance = await ContractService.getUserBalance(wallet);
    res.status(200).send(balance);
  }
}

module.exports = new ContractController();
