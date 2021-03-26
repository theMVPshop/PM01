import React from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = React.useState([]);
  let projectID = 1;

  React.useEffect(() => {
    axios
      .get(`http://localhost:4001/milestones/${projectID}`)
      .then((response) => {
        setProjects(response.data);
      });
  }, []);

  return projects.map((project) => <h1>Project Title: {project.title}</h1>);
}

export default Projects;
