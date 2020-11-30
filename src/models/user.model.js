const crypto = require('crypto');


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {

        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            get() {
                return () => this.getDataValue('password');
            }
        },
        salt: {
            type: DataTypes.STRING,
            get() {
                return () => this.getDataValue('salt');
            }
        }

    });

    User.generateSalt = function () {
        return crypto.randomBytes(16).toString('base64');
    } 
    User.encryptPassword = function (plainText, salt) {
        return crypto
            .createHash('RSA-SHA256')
            .update(plainText)
            .update(salt)
            .digest('hex')
    }
    
    const setSaltAndPassword = (user) => {
        if (user.changed('password')) {
            user.salt = User.generateSalt();
            user.password = User.encryptPassword(user.password(), user.salt());
        }
    }
    User.beforeCreate(setSaltAndPassword);
    User.beforeUpdate(setSaltAndPassword);

    return User;
};
