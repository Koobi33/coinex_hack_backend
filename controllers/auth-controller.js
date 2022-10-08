const UserService = require("../service/user-service");
const { web3 } = require("../web3-connect");
const { generateNonce } = require("../utils");
const jwt = require("jsonwebtoken");

class AuthController {
  async getNonce(req, res, next) {
    const walletAddress = req.params.wallet;
    if (walletAddress) {
      let user;
      user = await UserService.getUserByWallet(walletAddress);
      if (!user) {
        user = await UserService.createUser({ wallet: walletAddress });
      }
      return res.json(user.nonce);
    }
    return res.json(null);
  }
  async validateSignature(req, res, next) {
    const walletAddress = req.params.wallet;
    const { signature } = req.body;
    if (walletAddress && signature) {
      const user = await UserService.getUserByWallet(walletAddress);
      if (user) {
        // Convert msg to hex string
        const msg = web3.utils.sha3(`${user.nonce}`);
        //recover
        const signingAddress = web3.eth.accounts.recover(msg, signature);
        // Check if address matches
        if (signingAddress.toLowerCase() === walletAddress.toLowerCase()) {
          // Change user nonce
          await UserService.updateUser({
            wallet: walletAddress,
            nonce: generateNonce(),
          });
          // // Set jwt token
          const token = await jwt.sign(
            {
              wallet: user.wallet,
            },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "6h" }
          );
          res.status(200).json({
            success: true,
            token: `Bearer ${token}`,
            user,
            msg: "You are now logged in.",
          });
        } else {
          // User is not authenticated
          res.status(401).send("Invalid credentials");
        }
      }
    } else {
      return res.status(400).send();
    }
  }
}

module.exports = new AuthController();
