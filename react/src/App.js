import React from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";
import { withRouter } from "react-router";

function App() {
  const [apiResponse, setApiResponse] = React.useState("");

  function callAPI() {
    fetch("http://localhost:4001/users")
      .then((res) => res.text())
      .then((res) => setApiResponse(res))
      .catch((err) => err);
  }

  React.useEffect(() => {
    callAPI();
  }, []);

  const NavWithRouter = withRouter(Navigation);

  return (
    <div className="App">
      <NavWithRouter />
      <ReactRouter />
      <p>
        API call:{" "}
        {apiResponse ? (
          apiResponse
        ) : (
          <span style={{ color: "red" }}>NO RESPONSE</span>
        )}
      </p>
    </div>
  );
}

export default App;