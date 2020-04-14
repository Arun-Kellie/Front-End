import React from "react";
import "./App.scss";
import Routes from "../Routes";
import APICache from "../../services/APICache";
import APICacheContext from "../../services/APICacheContext";
import * as API from "../../services/API";

const App = () => {
  const cache = new APICache(API.load);

  return (
    <main className="main"  style={{height: '100%'}}>
      <APICacheContext.Provider value={cache}>
        <Routes />
      </APICacheContext.Provider>
    </main>
  );
};

export default App;
