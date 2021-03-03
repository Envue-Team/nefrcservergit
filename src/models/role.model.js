module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("role", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      name:{
        type: DataTypes.STRING
      }
    });
  
    return Role;
  };