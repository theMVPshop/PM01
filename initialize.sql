DROP TABLE IF EXISTS users, projects, milestones;

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
ms_name VARCHAR(50),
project_id INT NOT NULL,
priority INT NOT NULL,
ms_status INT NOT NULL,
PRIMARY KEY (id),
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
	(ms_name, project_id, priority, ms_status)
VALUES
	("Begin", 1, 1, 1), ("Wireframe", 1, 2, 0), ("Begin", 2, 1, 1), ("Wireframe", 2, 2, 0), ("Finish", 2, 3, 1), ("Finish", 1, 3, 0);