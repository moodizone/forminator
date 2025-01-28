import { Route, Routes } from "react-router";
import Content from "../layout/Content";
import Notfound from "./Notfound";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Content />} />
      <Route path="/:id" element={<Content />} />
      {/* wild card */}
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default Router;
