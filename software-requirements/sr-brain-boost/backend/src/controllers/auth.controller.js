const bcrypt = require('bcrypt');

exports.comparePassword = (password, dbPassword) => {
    return bcrypt.compareSync(password, dbPassword);
}