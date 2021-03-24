DROP TABLE IF EXISTS permissions, milestones, projects, users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50),
  pword VARCHAR(50),
  PRIMARY KEY (id)
);

CREATE TABLE projects (
id INT NOT NULL AUTO_INCREMENT,
project_name VARCHAR(50),
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

CREATE TABLE permissions (
id INT NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL,
project_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES users (id),
FOREIGN KEY (project_id) REFERENCES projects (id)
);

INSERT INTO users
	(user_name)
VALUES 
  ("James"), ("TEST");

INSERT INTO projects
	(project_name)
VALUES
	("First Project"), ("Another Project");
    
INSERT INTO milestones
	(title, subtitle, project_id, due_date, ms_status, description)
VALUES
	("Begin", "Talk about project", 1, "01/01/2021", "TODO", "NA"),
    ("Wireframe", "Show wireframes to client", 1, "01/01/2021", "TODO", "NA"),
    ("Begin", "Talk about project", 2, "01/01/2021", "TODO", "NA"),
    ("Wireframe", "Show to client", 2, "01/01/2021", "TODO", "NA"),
    ("Finish", "Project is completed", 2, "01/01/2021", "TODO", "NA"),
    ("Finish", "Project is completed", 1, "01/01/2021", "TODO", "NA");