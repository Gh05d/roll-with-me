import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Deathroll from "./Deathroll";
import NotFound from "./NotFound";
import Diffroll from "./Diffroll";

const App = () => (
  <Routes>
    <Route path="/roll-with-me" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="deathroll" element={<Deathroll />} />
      <Route path="diffroll" element={<Diffroll />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
