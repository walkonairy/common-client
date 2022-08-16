import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

// examples
import ExRedux from "./__redux__/ExRedux";
import { store } from "../originLib/redux/store";
import ExInput from "./__input__/ExInput";
import EXButton from "./__button__/ExButton";

import { theme } from "../originLib";

const root = ReactDOM.createRoot(document.getElementById("root"));

const _theme = extendTheme({ ...theme });

root.render(
  <React.Fragment>
    <ChakraProvider theme={_theme}>
      <Provider store={store}>
        {/*<ExRedux />*/}
        <ExInput />
        <EXButton />
      </Provider>
    </ChakraProvider>
  </React.Fragment>
);
