import TablePagination from "@mui/material/TablePagination";
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
import {
  currentEntityFunction,
  getallCitiesFunction,
  getAllEntityFunction,
} from "../Redux/Entity/action";
import { store } from "../Redux/store";
import { setPage, setRowsPerPage } from "../Redux/Pagination/action";
import Pagination from "@mui/material/Pagination";
import { ColorButton } from "./CreateEntity";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [filter, setfilter] = useState({
    cost: "",
    rating: "",
    city: "",
    verified: "",
  });
  const { data, city } = useSelector((store) => store.entity);
  const dispatch = useDispatch();
  const { page, count, rowsPerPage } = useSelector((store) => store.pagination);
  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage));
    dispatch(getAllEntityFunction(newPage, rowsPerPage, filter));
  };
  useEffect(() => {
    dispatch(getAllEntityFunction(page, rowsPerPage, filter));
    dispatch(getallCitiesFunction());
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setfilter({ ...filter, [name]: value });
    dispatch(
      getAllEntityFunction(page, rowsPerPage, { ...filter, [name]: value })
    );
  };
  return (
    <div>
      <div className="Filter-cont">
        <div>
          <InputLabel id="demo-simple-select-helper-label-pet">
            Sort By Cost
          </InputLabel>
          <Select
            fullWidth
            name="cost"
            onChange={handleChange}
            labelId="demo-simple-select-helper-label-pet"
            id="demo-simple-select-helper"
            label="Sort By Cost"
            value={filter.cost}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={-1}>High-Low</MenuItem>
            <MenuItem value={1}>Low-High</MenuItem>
          </Select>
        </div>
        <div>
          <InputLabel id="demo-simple-select-helper-label-pet">
            Sort By Rating
          </InputLabel>
          <Select
            fullWidth
            name="rating"
            onChange={handleChange}
            labelId="demo-simple-select-helper-label-pet-size"
            id="demo-simple-select-helper"
            label="Pet Size"
            value={filter.rating}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={-1}>High-Low</MenuItem>
            <MenuItem value={1}>Low-High</MenuItem>
          </Select>
        </div>
        <div>
          <InputLabel id="demo-simple-select-helper-label-pet">
            Filter By City
          </InputLabel>
          <Select
            fullWidth
            name="city"
            onChange={handleChange}
            labelId="demo-simple-select-helper-label-pet-size"
            id="demo-simple-select-helper"
            label="Pet Size"
            value={filter.city}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {city.map((el) => (
              <MenuItem key={nanoid()} value={el.city}>
                {el.city}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <InputLabel id="demo-simple-select-helper-label-pet">
            Filter By Verified
          </InputLabel>
          <Select
            fullWidth
            name="verified"
            onChange={handleChange}
            labelId="demo-simple-select-helper-label-pet-size"
            id="demo-simple-select-helper"
            label="Verified"
            value={filter.verified}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"yes"}>Yes</MenuItem>
            <MenuItem value={"no"}>No</MenuItem>
          </Select>
        </div>
      </div>
      <CustomizedTables data={data} />
      {/* <TablePaginationDemo /> */}
      <Pagination count={count} page={page} onChange={handleChangePage} />
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
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>City</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>Capacity</StyledTableCell>
            <StyledTableCell>Cost/day</StyledTableCell>
            <StyledTableCell>Verified</StyledTableCell>
            <StyledTableCell>Rating</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            ({
              id,
              _id,
              name,
              city,
              address,
              capacity,
              cost,
              verified,
              rating,
            }) => (
              <StyledTableRow
                onClick={() => {
                  dispatch(currentEntityFunction(_id));
                  navigate(`/listing/${_id}`);
                }}
                key={nanoid()}
              >
                <StyledTableCell>{id}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {name}
                </StyledTableCell>
                <StyledTableCell>{city}</StyledTableCell>
                <StyledTableCell>{address}</StyledTableCell>
                <StyledTableCell>{capacity}</StyledTableCell>
                <StyledTableCell>{cost}</StyledTableCell>
                <StyledTableCell>{verified.toUpperCase()}</StyledTableCell>
                <StyledTableCell>{rating}</StyledTableCell>
              </StyledTableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function TablePaginationDemo() {
  let { page, count, rowsPerPage } = useSelector((store) => store.pagination);
  const dispatch = useDispatch();
  const handleChangePage = (event, newPage) => {
    console.log(newPage, event.target);
    dispatch(setPage(newPage));
  };
  const handleChangeRowsPerPage = (event) => {
    let ax = parseInt(event.target.value, 10);
    dispatch(setRowsPerPage(ax));
    // dispatch(setPage(1));
  };
  return (
    <>
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

{
  /* <label htmlFor="">Sort By: Rating </label>
      <ColorButton>High-Low</ColorButton>
      <ColorButton>Low-High</ColorButton>
      <label htmlFor="">Sort By: CostPerDay </label>
      <ColorButton>High-Low</ColorButton>
      <ColorButton>Low-High</ColorButton> */
}
