import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { combineReducers } from "@reduxjs/toolkit";

import { reducers, store } from "../redux/store";
import { fetchFilter } from "../helper/fetchFilter";

function App({ Component, extraReducer = {} }) {
  fetchFilter();

  const _reducers = combineReducers({
    ...reducers,
    ...extraReducer,
  });

  store.replaceReducer(_reducers);

  return (
    <React.Fragment>
      <ChakraProvider>
        <ReduxProvider store={store}>
          <Component />
        </ReduxProvider>
      </ChakraProvider>
    </React.Fragment>
  );
}

export default App;
