import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Container,
  // ButtonGroup,
  // ToggleButton,
  Button,
} from "react-bootstrap";

function SetRoles() {
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

  return (
    <Container>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default SetRoles;
