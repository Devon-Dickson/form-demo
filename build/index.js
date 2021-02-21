import * as React from "./_snowpack/pkg/react.js";
import * as ReactDOM from "./_snowpack/pkg/react-dom.js";
import App from "./App.js";
import "./styles.css.proxy.js";
var mountNode = document.getElementById("app");
ReactDOM.render(/* @__PURE__ */ React.createElement(App, {
  name: "Jane"
}), mountNode);

if (import.meta.hot) {
  import.meta.hot.accept();
}
