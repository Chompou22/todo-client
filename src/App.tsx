import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import TodoWrapper from "./components/TodoWrapper";
import { store } from "./store/index";

const App = () => {
  return (
    <div className="container">
      <Provider store={store}>
        <TodoWrapper />
      </Provider>
    </div>
  );
};

export default App;
