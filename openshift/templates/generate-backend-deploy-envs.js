var crypto = require('crypto');

function generateToken() {
    return crypto.randomBytes(16).toString('base64');
}

function generateEnvs() {
    const jwt = generateToken();

return `APP_KEYS=${[generateToken(), generateToken(), generateToken(), generateToken()]}
API_TOKEN_SALT=${generateToken()}
ADMIN_JWT_SECRET=${jwt}
JWT_SECRET=${jwt}

`
}

// Log to STDOUT
console.log(generateEnvs())