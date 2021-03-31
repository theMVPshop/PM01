DROP TABLE IF EXISTS users, projects, milestones, permissions, devlog;

CREATE TABLE users (
  username VARCHAR(50),
  password VARCHAR(50),
  isModerator BOOLEAN,
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
subtitle VARCHAR(50),
project_id INT NOT NULL,
due_date VARCHAR(12),
ms_status VARCHAR(16),
description VARCHAR(50),
PRIMARY KEY (id),
FOREIGN KEY (project_id) REFERENCES projects (id)
);

CREATE TABLE devlog (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(50),
description VARCHAR(50),
project_id INT NOT NULL,
time_stamp INT NOT NULL,
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
	(username, password, isModerator)
VALUES 
  ("johnnyuserboy", "jamespassword123", true), ("TEST", "testpw123", false);

INSERT INTO projects
	(title, description)
VALUES
	("First Project", "first descript"), ("Another Project", "another descript");
    
INSERT INTO milestones
	(title, subtitle, project_id, due_date, ms_status, description)
VALUES
	("Begin", "Talk about project", 1, "01/01/2021", "TODO", "NA"),
    ("Wireframe", "Show wireframes to client", 1, "01/01/2021", "TODO", "NA"),
    ("Begin", "Talk about project", 2, "01/01/2021", "TODO", "NA"),
    ("Wireframe", "Show to client", 2, "01/01/2021", "TODO", "NA"),
    ("Finish", "Project is completed", 2, "01/01/2021", "TODO", "NA"),
    ("Finish", "Project is completed", 1, "01/01/2021", "TODO", "NA");

INSERT INTO devlog
	(title, description, project_id, time_stamp)
VALUES
	("Start the project", "We will start work now.", 1, 123456789);
    
INSERT INTO permissions
	(username, project_id)
VALUES
	("johnnyuserboy", 1);