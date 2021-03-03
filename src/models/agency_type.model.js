module.exports = (sequelize, DataTypes) => {
    const AgencyType = sequelize.define("agency_type", {
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

    return AgencyType;
};