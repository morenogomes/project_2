// *** Defining table User
// =============================================================
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [1]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  }, {
    // Disable the modification of tablenames 
    freezeTableName: true
  });

  // Creating a custom method to check if the email/password entered by the user is the same to the email/password stored in our database
  User.prototype.validUserInfo = function(userinfo, pswd) {
    console.log(`User info: ${userinfo}  -  Stored info: ${(pswd ? this.password : (!this.email ? this.username : this.email))}`)

    let result = false;
    if (!pswd){
      result = userinfo.localeCompare(this.email)
      if (!result){
        result = userinfo.localeCompare(this.username)
      }
    }
    else
      result = userinfo.localeCompare(this.password);

    return result;
  };

  return User;
};