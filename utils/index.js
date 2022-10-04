function generateNonce() {
  return Math.floor(Math.random() * 1000000);
}

module.exports = {
  generateNonce,
};
