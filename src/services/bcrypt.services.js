module.exports = {
  async crypt(secret) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(senha, salt);
    return hash;
  },
  async decrypt(secret, hash) {
    const valid = await bcrypt.compare(senha, hash);
    return valid;
  },
};
