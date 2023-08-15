const { DataTypes } = require('sequelize');
//import DataTypes object from sequelize so i can define the attributes of my model
module.exports = (sequelize) => {
//export the structure that will use sequelize as parameter so that it define my model
  sequelize.define('genre', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {timestamps:false}
  );
};