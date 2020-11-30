module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define("permission", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      name:{
        type: DataTypes.STRING
      },
      description:{
        type: DataTypes.STRING
      }
    });
  
    return Permission;
  };