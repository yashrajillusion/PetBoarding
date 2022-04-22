import { Route, Routes } from "react-router-dom";
import { CreateEntityPage } from "./CreateEntity";
import { EntityPage } from "./EntityPage";
import { Home } from "./Home";
import { Navbar } from "./Navbar";

export const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<EntityPage />} />
        <Route path="/listing/create" element={<CreateEntityPage />} />
      </Routes>
    </>
  );
};
