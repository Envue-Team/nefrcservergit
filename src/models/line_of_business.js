module.exports = (sequelize, DataTypes) => {
    const LineOfBusiness = sequelize.define("line_of_business", {
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

    return LineOfBusiness;
};