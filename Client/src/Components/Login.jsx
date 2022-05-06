import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import { Link, Navigate } from "react-router-dom";
import { authRegister } from "../Redux/Auth/action";
import { Alert, CircularProgress } from "@mui/material";

const blue = {
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

export const Login = () => {
  const { user, token, type, loading, error } = useSelector(
    (store) => store.user
  );
  const [userDetails, setuserDetails] = useState({ email: "", password: "" });
  const distpatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserDetails({ ...userDetails, [name]: value });
  };

  if (type) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="loginbox">
        {error ? (
          <Alert severity="error">
            There was a problem logging in. Check your email and password or
            create an account.
          </Alert>
        ) : (
          ""
        )}
        <p>Email</p>
        <input
          name="email"
          onChange={handleChange}
          type="text"
          placeholder="..email"
        ></input>
        <p>Password</p>
        <input
          name="password"
          onChange={handleChange}
          type="text"
          placeholder="..password"
        />
        {loading ? (
          <CustomButtonRoot disabled>
            <CircularProgress sx={{ color: "white" }} />
          </CustomButtonRoot>
        ) : (
          <CustomButtonRoot
            onClick={() => {
              const url = "http://localhost:5001/auth/login";
              distpatch(authRegister(url, userDetails));
            }}
          >
            Login
          </CustomButtonRoot>
        )}
        <Link to={"/signup"}>Don't have an account Signup</Link>
      </div>
    </>
  );
};

export const CustomButtonRoot = styled(ButtonUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  max-height: 50px;
  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
