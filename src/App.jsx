import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Deathroll from "./Deathroll";

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="deathroll" element={<Deathroll />} />
    </Route>
  </Routes>
);

export default App;
