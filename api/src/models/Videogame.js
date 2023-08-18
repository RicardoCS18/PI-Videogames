const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('videogame', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false
    },
    released:{
      type: DataTypes.STRING,
      allowNull: false
    },
    rating:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
  },
  {timestamps:false}
  );
};