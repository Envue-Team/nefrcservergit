module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define("organization", {
      id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false
      },
      name: {
        type: DataTypes.STRING
      },
      street_number: {
        type: DataTypes.INTEGER
      },
      street_name: {
        type: DataTypes.STRING
      },
      city:{
        type:DataTypes.STRING
      },
      state:{
        type:DataTypes.STRING,
        defaultValue:"FL"
      },
      zip:{
        type:DataTypes.INTEGER
      },
      county:{
        type:DataTypes.STRING
      },
      website:{
        type:DataTypes.STRING
      },
      public_safety:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
      }
    }
  );

  return Organization;
};