const { DataTypes } = require('sequelize');
//import DataTypes object from sequelize so i can define the attributes of my model// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
//export the structure that will use sequelize as parameter so that it define my model
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