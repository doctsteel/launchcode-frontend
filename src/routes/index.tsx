import { Route, Routes as Switch } from "react-router-dom";
import Home from "../screens/Home";
import Quotes from "../screens/Quotes";

const Routes = () => {
  return (
    <Switch>
      <Route path="/home" element={<Home />} />
      <Route path="/quotes" element={<Quotes />} />
    </Switch>
  );
};

export default Routes;
