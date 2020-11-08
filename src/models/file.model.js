module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define("file", {
	id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    filePath: {
      type: DataTypes.STRING
    },
    fileName:{
      type: DataTypes.STRING
    }
  });

  return File;
};