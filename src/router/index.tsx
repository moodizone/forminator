import { Navigate, Route, Routes } from "react-router";

import Content from "../layout/Content";
import Notfound from "./Notfound";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Content />} />
      <Route path="/:id" element={<Content />} />
      {/* for programmatically usages */}
      <Route path="/404" element={<Notfound />} />
      {/* wild card */}
      <Route path="*" element={<Navigate to={"/404"} />} />
    </Routes>
  );
}

export default Router;
