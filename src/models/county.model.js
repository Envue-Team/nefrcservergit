module.exports = (sequelize, DataTypes) => {
    const County = sequelize.define("county", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            defaultValue: DataTypes.INTEGER.random
        },
        name: {
            type: DataTypes.STRING
        }
    });

    return County;
};