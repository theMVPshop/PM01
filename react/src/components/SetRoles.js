import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Container,
  Form,
  // ButtonGroup,
  // ToggleButton,
  Button,
} from "react-bootstrap";

function SetRoles({ projects }) {
  const [users, setUsers] = useState([]);
  // const [checked, setChecked] = useState(false);
  // const [radioValue, setRadioValue] = useState("1");

  // const radios = [
  //   { name: "Client", value: "1" },
  //   { name: "Moderator", value: "2" },
  // ];

  // let userObject = {
  //   isModerator:
  // }

  useEffect(() => {
    axios.get(`http://localhost:4001/users/`).then((response) => {
      console.log(response.data);
      setUsers(response.data);
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

  const handleChangePermission = (project_id, username) => {
    axios.post("http://localhost:4001/permissions/", {
      username,
      project_id,
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
                {/* moderator toggle button below */}
                {/* <ButtonGroup toggle>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      type="radio"
                      variant="dark"
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup> */}
                {/* toggle button ends above */}
                {
                  <Button
                    variant={user.isModerator ? "success" : "warning"}
                    onClick={() => handleClick(user.isModerator, user.username)}
                  >
                    {user.isModerator ? "Moderator" : "Client"}
                  </Button>
                }
              </td>
              <td>
                <Form>
                  {["checkbox"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      {projects.map((project, idx) => (
                        <Form.Check
                          inline
                          label={project.title}
                          type={type}
                          id={`inline-${type}-1`}
                          onChange={() =>
                            handleChangePermission(project.id, user.username)
                          }
                        />
                      ))}
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

// style={{ backgroundColor: "#adb5bd", color: "#111" }}
