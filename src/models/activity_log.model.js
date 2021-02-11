module.exports = (sequelize, DataTypes) => {
    const activity_log = sequelize.define("activity_log", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      entry: { 
        type: DataTypes.STRING
      },
    }); 

    return activity_log;
  };