import { useDispatch, useSelector } from "react-redux";
import { React, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { Link, Navigate } from "react-router-dom";
import { addPetFunction, getAllPetFunction } from "../Redux/Pets/action";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  editBookingFunction,
  getAllBookingFunction,
} from "../Redux/Booking/action";
const blue = {
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const { booking } = useSelector((store) => store.booking);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user._id !== undefined) {
      dispatch(getAllBookingFunction(user._id, user.role));
    }
  }, [user]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {user.role === "admin" ? (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="All Booking" {...a11yProps(0)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {booking.map((el) => (
              <BookingStatusCard key={nanoid()} data={el} status_btn={true} />
            ))}
          </TabPanel>
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="All Pets" {...a11yProps(0)} />
              <Tab label="Add Pets" {...a11yProps(1)} />
              <Tab label="Booking" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div>
              <PetsCont />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>
              <AddPetsForm />
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            {booking.map((el) => (
              <BookingStatusCard key={nanoid()} data={el} />
            ))}
          </TabPanel>
        </Box>
      )}
    </>
  );
}

export const PetsCont = () => {
  const dispatch = useDispatch();
  const { pet } = useSelector((store) => store.pet);
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    if (user._id !== undefined) {
      dispatch(getAllPetFunction(user._id));
    }
  }, [user]);

  return (
    <div>
      <CustomizedTables data={pet} />
    </div>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const CustomizedTables = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>SN</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Types</StyledTableCell>
            <StyledTableCell>Size</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ name, size, types }, id) => (
            <StyledTableRow key={nanoid()}>
              <StyledTableCell component="th" scope="row">
                {id}
              </StyledTableCell>
              <StyledTableCell>{name}</StyledTableCell>
              <StyledTableCell>{types}</StyledTableCell>
              <StyledTableCell>{size}</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const UserPets = () => {
  return (
    <>
      <BasicTabs />
    </>
  );
};

export const AddPetsForm = () => {
  const { user, token, type, loading, error } = useSelector(
    (store) => store.user
  );
  const [petDetails, setpetDetails] = useState({
    userId: user._id,
    size: "",
    types: "",
    name: "",
  });
  const distpatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setpetDetails({ ...petDetails, [name]: value });
  };

  return (
    <>
      <div className="loginbox">
        <p>Name</p>
        <input
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="..name"
        ></input>
        <p>Size</p>
        <input
          name="size"
          onChange={handleChange}
          type="number"
          placeholder="..size"
        ></input>
        <p>Types</p>
        <input
          name="types"
          onChange={handleChange}
          type="text"
          placeholder="..types"
        />
        <CustomButtonRoot
          onClick={() => {
            distpatch(addPetFunction(petDetails));
          }}
        >
          Add Pets
        </CustomButtonRoot>
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

const BookingStatusCard = ({ data, status_btn }) => {
  let status = "";
  let message = "";
  if (data.status == "pending") {
    status = "warning";
    message = "Pending";
  } else if (data.status == "accepted") {
    status = "success";
    message = "Accepted";
  } else {
    status = "error";
    message = "Declined";
  }
  return (
    <div className="status">
      <p>ID {data._id}</p>
      <p>{data.petId.name}</p>

      <Alert severity={status}>{message}</Alert>
      {status_btn ? <BookingTogle {...data} /> : ""}
    </div>
  );
};

export function BookingTogle({ _id, from, to, userId }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (server, val, id) => {
    if (server) {
      dispatch(editBookingFunction({ status: val }, id));
    }
    setOpen(false);
  };

  return (
    <div style={{ display: "inline" }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Confirm
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          handleClose(false, null);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`userId : ${userId}`}
        </DialogTitle>
        <DialogContent>
          {`From :- ${from?.split("T")[0]} To :- ${to.split("T")[0]}`}
          <div></div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose(false, null);
            }}
          >
            cancel
          </Button>
          <Button
            onClick={() => {
              handleClose(true, "declined", _id);
            }}
            autoFocus
          >
            Decline
          </Button>
          <Button
            onClick={() => {
              handleClose(true, "accepted", _id);
            }}
            autoFocus
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
