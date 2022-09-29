const UserService = require("../service/user-service");
const ethUtil = require("ethereumjs-util");

class AuthController {
  async getNonce(req, res, next) {
    const walletAddress = req.params.wallet;
    if (walletAddress) {
      let user = null;
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
        const msg = `${user.nonce}`;
        // Convert msg to hex string
        const msgHex = ethUtil.bufferToHex(Buffer.from(msg));

        // Check if signature is valid
        const msgBuffer = ethUtil.toBuffer(msgHex);
        const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
        const signatureBuffer = ethUtil.toBuffer(signature);
        const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
        const publicKey = ethUtil.ecrecover(
          msgHash,
          signatureParams.v,
          signatureParams.r,
          signatureParams.s
        );
        const addressBuffer = ethUtil.publicToAddress(publicKey);
        const address = ethUtil.bufferToHex(addressBuffer);

        console.log({ address, walletAddress });
        // Check if address matches
        if (address.toLowerCase() === walletAddress.toLowerCase()) {
          // Change user nonce
          // user.nonce = Math.floor(Math.random() * 1000000);
          // user.save((err) => {
          //   if (err) {
          //     res.send(err);
          //   }
          // });
          // // Set jwt token
          // const token = jwt.sign({
          //   _id: user._id,
          //   address: user.address
          // }, process.env.JWT_SECRET, {expiresIn: '6h'});
          res.status(200).json({
            success: true,
            token: `Bearer ${null}`,
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
