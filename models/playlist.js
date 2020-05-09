// *** Defining table Playlist
// =============================================================
module.exports = function(sequelize, DataTypes) {
  var Playlist = sequelize.define("Playlist", {
    songName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artistName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    albumImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trackURI: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Disable the modification of tablenames 
    freezeTableName: true
  });

  return Playlist;
};