const UserService = require('../service/user-service');

class AuthController {
    async getNonce(req, res, next) {
        const walletAddress = req.params.wallet;
        if (walletAddress) {
            const [user] = await UserService.getUserByWallet(walletAddress);
            return res.json(user.nonce);
        }
        return res.json(null);
    }
}

module.exports = new AuthController();
