import React from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import axios from "axios";
import { withRouter } from "react-router";

function App() {
  const netlifyIdentity = require("netlify-identity-widget");
  const [currentUser, setCurrentUser] = React.useState(null);

  netlifyIdentity.init();

  const user = netlifyIdentity.currentUser();

  console.log(user);

  function initNetlifyIdentity() {
    const script = document.createElement("script");

    script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
    script.async = true;

    document.body.appendChild(script);
  }

  function openNetlifyModal() {
    const netlifyIdentity = window.netlifyIdentity;

    if (netlifyIdentity) {
      netlifyIdentity.open();
      netlifyIdentity.on("login", (user) => {
        console.log("login", user);
        axios.get("http://localhost:4001/users").then((response) => {
          let existingUser = response.data.find(
            (x) => x.username === user.email
          );
          !existingUser &&
            axios.post("http://localhost:4001/users/", {
              username: user.email,
              isModerator: 0,
            });
          setCurrentUser(user.email);
        });
      });
    } else {
      console.log("netlifyIdentity not defined");
    }
  }

  function NetlifyIdentity() {
    React.useEffect(() => {
      initNetlifyIdentity();
    }, []);

    return <></>;
  }

  const NavWithRouter = withRouter(Navigation);
  const localStorageCurrentUser =
    currentUser && JSON.parse(localStorage.getItem("gotrue.user")).email;

  return (
    <>
      <NavWithRouter
        NetlifyIdentity={NetlifyIdentity}
        openNetlifyModal={openNetlifyModal}
      />
      <ReactRouter
        currentUser={currentUser}
        localStorageCurrentUser={localStorageCurrentUser}
      />
      <p>currentUser: {currentUser && `welcome ${currentUser}`}</p>
      <p>localStorage currentUser: {`welcome ${localStorageCurrentUser}`}</p>
    </>
  );
}

export default App;
