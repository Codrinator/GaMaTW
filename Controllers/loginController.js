const crypto = require('crypto');
const hash = crypto.createHash('sha256');
console.log(hash.update("asd").digest('hex'));

