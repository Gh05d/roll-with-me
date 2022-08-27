import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Deathroll from "./pages/Deathroll";
import NotFound from "./pages/NotFound";
import Diffroll from "./pages/Diffroll";

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
