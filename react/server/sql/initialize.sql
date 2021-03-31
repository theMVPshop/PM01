DROP TABLE IF EXISTS users, projects, milestones, permissions, devlog;

CREATE TABLE users (
  username VARCHAR(50),
  password VARCHAR(50),
  PRIMARY KEY (username)
);

CREATE TABLE projects (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(50),
description VARCHAR(150),
PRIMARY KEY (id)
);

CREATE TABLE milestones (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(50),
project_id INT NOT NULL,
priority INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (project_id) REFERENCES projects (id)
);

CREATE TABLE permissions (
id INT NOT NULL AUTO_INCREMENT,
username VARCHAR(50),
project_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (username) REFERENCES users (username),
FOREIGN KEY (project_id) REFERENCES projects (id)
);


INSERT INTO users
	(username, password)
VALUES 
  ("johnnyuserboy", "jamespassword123"), ("TEST", "testpw123");

INSERT INTO projects
	(title, description)
VALUES
	("First Project", "first descript"), ("Another Project", "another descript");
    
INSERT INTO milestones
	(title, project_id, priority)
VALUES
	("Begin", 1, 1), ("Wireframe", 2, 2);
    
INSERT INTO permissions
	(username, project_id)
VALUES
	("johnnyuserboy", 1);