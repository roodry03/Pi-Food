const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('diets', {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defautValue: DataTypes.UUIDV4,
        },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { freezeTableName: true, timestamps: false }
    );
  };