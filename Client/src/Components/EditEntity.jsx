import styled from "@emotion/styled";
import { InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addEntityFunction, editEntityFunction } from "../Redux/Entity/action";
import { ColorButton } from "./CreateEntity";

export const EditEntityPage = () => {
  let { current, city } = useSelector((store) => store.entity);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState(current);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(editEntityFunction(data, id));
  };
  return (
    <div className="form-cont">
      <p>Edit Entity</p>
      <div className="input-cont">
        <TextField
          onChange={handleChange}
          id="outlined-basic"
          name="name"
          label="Name"
          variant="outlined"
          value={data.name}
        />
        <TextField
          onChange={handleChange}
          id="outlined-basic"
          name="city"
          label="City"
          variant="outlined"
          value={data.city}
        />
        <TextField
          onChange={handleChange}
          id="outlined-basic"
          name="address"
          label="Address"
          variant="outlined"
          value={data.address}
        />
        <TextField
          onChange={handleChange}
          name="capacity"
          id="outlined-basic"
          type="number"
          label="Capacity"
          variant="outlined"
          value={data.capacity}
        />
        <TextField
          onChange={handleChange}
          name="cost"
          id="outlined-basic"
          type="number"
          label="Cost/perday"
          variant="outlined"
          value={data.cost}
        />
        <TextField
          onChange={handleChange}
          name="rating"
          id="outlined-basic"
          type="number"
          label="Rating"
          variant="outlined"
          value={data.rating}
        />
      </div>
      <div className="select-cont">
        <div>
          <InputLabel id="demo-simple-select-helper-label">Verified</InputLabel>
          <Select
            fullWidth
            name="verified"
            onChange={handleChange}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={data.verified}
            label="Verified"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"yes"}>Yes</MenuItem>
            <MenuItem value={"no"}>No</MenuItem>
          </Select>
        </div>
        <div>
          <InputLabel id="demo-simple-select-helper-label-pet">
            Pet Types
          </InputLabel>
          <Select
            fullWidth
            name="types"
            onChange={handleChange}
            labelId="demo-simple-select-helper-label-pet"
            id="demo-simple-select-helper"
            value={data.types}
            label="Pet Types"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"dog"}>Dog</MenuItem>
            <MenuItem value={"cats"}>Cats</MenuItem>
            <MenuItem value={"rabbits"}>Rabbits</MenuItem>
          </Select>
        </div>
        <div>
          <InputLabel id="demo-simple-select-helper-label-pet">
            Pet Size
          </InputLabel>
          <Select
            name="size"
            fullWidth
            onChange={handleChange}
            labelId="demo-simple-select-helper-label-pet-size"
            id="demo-simple-select-helper"
            value={data.size}
            label="Pet Size"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"1-5"}>1-5kg</MenuItem>
            <MenuItem value={"5-10"}>5-10kg</MenuItem>
            <MenuItem value={"10-20"}>10-20kg</MenuItem>
            <MenuItem value={"20-40"}>20-40kg</MenuItem>
            <MenuItem value={"40-100"}>40+kg</MenuItem>
          </Select>
        </div>
      </div>
      <div className="detail-cont">
        <TextField
          name="supervision"
          fullWidth
          onChange={handleChange}
          id="outlined-basic"
          label="Level of adult Supervision"
          variant="outlined"
          margin="normal"
          value={data.supervision}
        />
        <TextField
          name="unsepervised"
          fullWidth
          onChange={handleChange}
          id="outlined-basic"
          label="The place your pet will be if they are left unsupervised at home."
          variant="outlined"
          margin="normal"
          value={data.unsepervised}
        />
        <TextField
          name="sleepPlace"
          fullWidth
          onChange={handleChange}
          id="outlined-basic"
          label="The place your pet will sleep at night"
          variant="outlined"
          margin="normal"
          value={data.sleepPlace}
        />
        <TextField
          name="poty"
          fullWidth
          onChange={handleChange}
          id="outlined-basic"
          label="The number of potty breaks provided per day"
          variant="outlined"
          margin="normal"
          value={data.poty}
        />
        <TextField
          name="walks"
          fullWidth
          onChange={handleChange}
          id="outlined-basic"
          label="The number of walks provided per day"
          variant="outlined"
          margin="normal"
          value={data.walks}
        />
        <TextField
          name="typeofhome"
          fullWidth
          onChange={handleChange}
          id="outlined-basic"
          label="The type of home I stay in"
          variant="outlined"
          margin="normal"
          value={data.typeofhome}
        />
        <TextField
          name="outdoor"
          fullWidth
          onChange={handleChange}
          id="outlined-basic"
          label="My outdoor area size."
          variant="outlined"
          margin="normal"
          value={data.outdoor}
        />
        <TextField
          name="emergency"
          fullWidth
          onChange={handleChange}
          id="outlined-basic"
          label="Emergency transport"
          variant="outlined"
          margin="normal"
          value={data.emergency}
        />
        <TextField
          name="summary"
          fullWidth
          onChange={handleChange}
          id="outlined-multiline-static"
          label="Summary"
          multiline
          rows={3}
          margin="normal"
          value={data.summary}
        />
        <ColorButton onClick={handleSubmit} variant="contained">
          Submit
        </ColorButton>
      </div>
    </div>
  );
};
