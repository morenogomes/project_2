USE b8jy67glz6ahf9q6;

CREATE TABLE User
(
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Album
(
  id INT NOT NULL AUTO_INCREMENT,
  albumName VARCHAR(255) NOT NULL,
  albumImage VARCHAR(255) NOT NULL,
  artistName VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  UserId INTEGER NOT NULL,
  PRIMARY KEY (id), 
  FOREIGN KEY (UserId) REFERENCES User (id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE Artist
(
  id INT NOT NULL AUTO_INCREMENT,
  artistName VARCHAR(255) NOT NULL,
  artistImage VARCHAR(255) NOT NULL,
  genre VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  UserId INTEGER NOT NULL,
  PRIMARY KEY (id), 
  FOREIGN KEY (UserId) REFERENCES User (id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE Playlist
(
  id INT NOT NULL AUTO_INCREMENT,
  songName VARCHAR(255) NOT NULL,
  artistName VARCHAR(255) NOT NULL,
  albumImage VARCHAR(255) NOT NULL,
  trackURI VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  UserId INTEGER NOT NULL,
  PRIMARY KEY (id), 
  FOREIGN KEY (UserId) REFERENCES User (id) ON DELETE NO ACTION ON UPDATE CASCADE
);
