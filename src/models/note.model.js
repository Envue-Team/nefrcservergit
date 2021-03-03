module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define("note", {
	  id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    type: {
      type: DataTypes.TEXT,
      defaultValue: "general"
    },
    text: {
      type: DataTypes.TEXT
    }
  });

  return Note;
};