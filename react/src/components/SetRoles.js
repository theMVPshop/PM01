import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Form, Button } from "react-bootstrap";

function SetRoles({ projects }) {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4001/users/").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
    axios.get("http://localhost:4001/permissions/").then((response) => {
      setPermissions(response.data);
    });
  }, []);

  const handleClick = (isMod, username) => {
    axios
      .post("http://localhost:4001/users/", {
        isModerator: !isMod,
        username,
      })
      .then(() => {
        axios.get("http://localhost:4001/users/").then((response) => {
          setUsers(response.data);
        });
      });
  };

  const handleChangePermission = (e, project_id, username) => {
    console.log("checked?", e.target.checked, e.target.value);
    e.target.checked
      ? axios
          .delete(`http://localhost:4001/permissions/${e.target.value}`)
          .then(() => {
            axios.get("http://localhost:4001/permissions/").then((response) => {
              setPermissions(response.data);
            });
          })
      : axios
          .post("http://localhost:4001/permissions/", {
            username,
            project_id,
          })
          .then(() => {
            axios.get("http://localhost:4001/permissions/").then((response) => {
              setPermissions(response.data);
            });
          });
  };

  return (
    <Container>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr>
              <td>{user.username}</td>
              <td>
                <Button
                  variant={user.isModerator ? "success" : "warning"}
                  onClick={() => handleClick(user.isModerator, user.username)}
                >
                  {user.isModerator ? "Moderator" : "Client"}
                </Button>
              </td>
              <td>
                <Form>
                  {["checkbox"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      {projects.map((project, idx) => {
                        let hasPermission = permissions.find(
                          (x) =>
                            x.username === user.username &&
                            x.project_id === project.id
                        );
                        return (
                          <Form.Check
                            inline
                            label={project.title}
                            type={type}
                            id={`inline-${type}-1`}
                            checked={hasPermission}
                            value={hasPermission && hasPermission.id}
                            onChange={(e) =>
                              handleChangePermission(
                                e,
                                project.id,
                                user.username
                              )
                            }
                          />
                        );
                      })}
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default SetRoles;
