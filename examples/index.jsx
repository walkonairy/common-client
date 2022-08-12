import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// examples
import ExRedux from "./__redux__/ExRedux";
import { store } from "../originLib/redux/store";
import ExInput from "./__input__/ExInput";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.Fragment>
    <Provider store={store}>
      {/*<ExRedux />*/}
      <ExInput />
    </Provider>
  </React.Fragment>
);
