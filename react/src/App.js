import React, { Component } from "react";
import Navigation from "./components/Navigation";
import ReactRouter from "./ReactRouter";

// function App() {
//   return (
//     <div className="App">
//       <Navigation />
//       <ReactRouter />
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  callAPI() {
    fetch("http://localhost:4001/users")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <ReactRouter />
        <p>Here is the API call {this.state.apiResponse}.</p>
      </div>
    );
  }
}

export default App;
