// *** Defining table Artist
// =============================================================
module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define("Artist", {
    artistName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artistImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Disable the modification of tablenames 
    freezeTableName: true
  });

  Artist.associate = function (models) {
    Artist.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Artist;
};