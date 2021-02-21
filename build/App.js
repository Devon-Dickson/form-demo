import * as React from "./_snowpack/pkg/react.js";
class App extends React.Component {
  render() {
    const {name} = this.props;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", {
      className: "text-4xl text-white bg-black"
    }, "Hello ", name));
  }
}
export default App;
