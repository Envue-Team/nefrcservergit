module.exports = (sequelize, DataTypes) => {
    const ArcRelationship = sequelize.define("arc_relationship", {
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

    return ArcRelationship;
};