// *** Defining table Album
// =============================================================
module.exports = function(sequelize, DataTypes) {
  var Album = sequelize.define("Album", {
    albumName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    albumImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artistName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Disable the modification of tablenames 
    freezeTableName: true
  });

  return Album;
};