import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div style={{ marginTop: "2%" }}>
      <Link style={{ margin: "2%" }} to={"/"}>
        Home
      </Link>
      <Link style={{ margin: "2%" }} to={"/listing/create"}>
        Create Entity
      </Link>
    </div>
  );
};
