import { Route, Routes } from "react-router-dom";
import { CreateEntityPage } from "./CreateEntity";
import { EditEntityPage } from "./EditEntity";
import { EntityPage } from "./EntityPage";
import { Home } from "./Home";
import { Login } from "./Login";
import { Navbar } from "./Navbar";
import { Signup } from "./Signup";
import { UserPets } from "./UserPets";

export const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<UserPets />} />
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/signup"} element={<Signup />}></Route>
        <Route path="/listing/:id" element={<EntityPage />} />
        <Route path="/listing/create" element={<CreateEntityPage />} />
        <Route path="/listing/edit/:id" element={<EditEntityPage />} />
      </Routes>
    </>
  );
};
