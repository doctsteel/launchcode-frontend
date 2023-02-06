import React from "react";
import Routes from "./routes";
import BaseScreen from "./screens/Base";

export const App = () => {
  return (
    <div className="App" style={{ background: "#EDF0F9" }}>
      <BaseScreen>
        <Routes />
      </BaseScreen>
    </div>
  );
};
