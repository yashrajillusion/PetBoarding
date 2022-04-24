import { React } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ColorButton } from "./CreateEntity";
import { deleteEntityFunction } from "../Redux/Entity/action";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getAllPetFunction } from "../Redux/Pets/action";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { addBookingFunction } from "../Redux/Booking/action";

export function SimpleAccordion({ heading, details }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{heading}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{details}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export const EntityPage = () => {
  const { current, city } = useSelector((store) => store.entity);
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    dispatch(getAllPetFunction(user._id));
  }, []);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const navigate = useNavigate();
  return (
    <div>
      <ColorButton
        onClick={() => {
          navigate(`/listing/edit/${id}`);
        }}
      >
        Edit
      </ColorButton>
      <ColorButton
        onClick={() => {
          dispatch(deleteEntityFunction(id));
        }}
      >
        Delete
      </ColorButton>
      <AlertDialog />
      <SimpleAccordion heading={"About"} details={current.name} />
      <SimpleAccordion
        heading={"Number of pets that will be watched at one time."}
        details={current.capacity}
      />
      <SimpleAccordion heading={"Accepted Pet Types"} details={current.name} />
      <SimpleAccordion heading={"Accepted Pet size"} details={current.types} />
      <SimpleAccordion
        heading={"Level of adult supervision."}
        details={current.size}
      />
      <SimpleAccordion
        heading={
          "The place your pet will be if they are left unsupervised at home."
        }
        details={current.unsepervised}
      />
      <SimpleAccordion
        heading={"The place your pet will sleep at night."}
        details={current.sleepPlace}
      />
      <SimpleAccordion
        heading={"The number of potty breaks provided per day."}
        details={current.poty}
      />
      <SimpleAccordion
        heading={"The number of walks provided per day."}
        details={current.walks}
      />
      <SimpleAccordion
        heading={"The type of home I stay in."}
        details={current.typeofhome}
      />
      <SimpleAccordion
        heading={"My outdoor area size."}
        details={current.outdoor}
      />
      <SimpleAccordion
        heading={"Emergency transport."}
        details={current.emergency}
      />
      <SimpleAccordion heading={"Summary"} details={current.summary} />
    </div>
  );
};

export function AlertDialog() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { pet } = useSelector((store) => store.pet);
  const { booking: Bdata } = useSelector((store) => store.booking);
  console.log(Bdata);
  const [booking, setBooking] = useState({
    userId: pet[0].userId,
    from: "",
    to: "",
    petId: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };
  const handleClose = (e) => {
    if (e.target.value == "cancel") return;
    dispatch(addBookingFunction(booking));
    setBooking({
      userId: pet[0].userId,
      from: "",
      to: "",
      petId: "",
    });
    setOpen(false);
  };

  return (
    <div style={{ display: "inline" }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Book Now
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select date and your pet by name"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <InputLabel id="demo-simple-select-helper-label-pet">
              Pet Name
            </InputLabel>
            <Select
              name="petId"
              fullWidth
              onChange={handleChange}
              labelId="demo-simple-select-helper-label-pet-size"
              id="demo-simple-select-helper"
              label="Pet Name"
            >
              {pet.map(({ _id, name }) => (
                <MenuItem value={_id}>{name}</MenuItem>
              ))}
            </Select>
            <InputLabel id="demo-simple-select-helper">From</InputLabel>
            <TextField
              name="from"
              fullWidth
              onChange={handleChange}
              id="outlined-basic"
              variant="outlined"
              margin="normal"
              type="date"
            />
            <InputLabel id="demo-simple-select-helper">To</InputLabel>
            <TextField
              name="to"
              fullWidth
              onChange={handleChange}
              id="outlined-basic"
              variant="outlined"
              margin="normal"
              type="date"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
