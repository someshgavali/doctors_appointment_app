import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Modal,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React, { useContext, useEffect, useState } from "react";

import { DataContext } from "../../dataContext";
import FormDialog from "./PatientForm";

const Patients = () => {
  const { patientsInfo, setPatientsInfo } = useContext(DataContext);
  const [filterData, setFilterData] = useState(patientsInfo);
  const [search, setSearch] = useState("");
  const [currentPatient, setCurrentPatient] = useState([]);

  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(
    () => {
      if (search === null || search === "") setFilterData(patientsInfo);
      else
        setFilterData(
          filterData.filter(
            (val) =>
              val.title
                .toString()
                .toLowerCase()
                .includes(search.toString().toLowerCase()) ||
              val.Gender.toString()
                .toLowerCase()
                .includes(search.toString().toLowerCase()) ||
              val.BloodGroup.toString()
                .toLowerCase()
                .includes(search.toString().toLowerCase()) ||
              val.Email.toString()
                .toLowerCase()
                .includes(search.toString().toLowerCase())
          )
        );
    },
    // eslint-disable-next-line
    [search, patientsInfo]
  );
  // console.log(filterData);

  const displayPatient = (id) => {
    setCurrentPatient(patientsInfo.find((val) => val.Id === Number(id)));
    setOpen(true);
  };

  const handleDelete = (id) => {
    setOpen(false);
    setPatientsInfo(
      patientsInfo.filter((ele) => {
        // console.log(ele.Id, id);
        return ele.Id !== Number(id); // Check for data type
      })
    );
  };

  // console.log(currentPatient);
  return (
    <Box sx={{ p: { md: 5, sm: 5, xs: 2 }, opacity: open ? 0.5 : 1 }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        display="inline-block"
        borderBottom={".2rem solid #7575ff"}>
        PATIENTS LIST
      </Typography>
      <Box display="flex" mt={1} mb={3} justifyContent="end">
        <Stack
          sx={{ bgcolor: "#fff" }}
          direction="row"
          pl={1}
          alignItems="center"
          border={1}
          borderRadius={1}>
          <TextField
            size="small"
            InputProps={{ disableUnderline: true }}
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            variant="standard"></TextField>
          <IconButton
            type="button"
            aria-label="search"
            onClick={() => setSearch("")}>
            <CloseOutlinedIcon fontSize="small" />
          </IconButton>
          <Divider orientation="vertical"></Divider>
          <IconButton type="button" aria-label="search">
            <SearchIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Button
          sx={{
            ml: 1,
            bgcolor: "#7575ff",
            ":hover": { bgcolor: "#7f7fed" },
            width: 200,
          }}
          size="small"
          variant="contained"
          onClick={() => {
            setOpenForm(true);
            setCurrentPatient([]);
          }}>
          Add Patient
        </Button>
      </Box>

      <TableContainer
        sx={{ borderTop: "5px solid #7575ff", maxHeight: { md: 450, xs: 600 } }}
        component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}> Id</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Blood Group</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData &&
              filterData.map((row) => (
                <TableRow
                  key={row.Id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    ":hover": { bgcolor: "#f1f1f1" },
                  }}>
                  <TableCell>{row.Id}</TableCell>
                  <TableCell
                    onClick={() => displayPatient(row.Id)}
                    sx={{ color: "blue", cursor: "pointer" }}>
                    {row.title}
                  </TableCell>
                  <TableCell>{row.Gender}</TableCell>
                  <TableCell>{row.BloodGroup}</TableCell>
                  <TableCell>{row.Mobile}</TableCell>
                  <TableCell>{row.Email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <NestedModal
        currentPatient={currentPatient}
        open={open}
        setOpen={setOpen}
        setOpenForm={setOpenForm}
        handleDelete={handleDelete}
        // addPatient={addPatient}
      />
      <PatientInput
        openForm={openForm}
        setOpenForm={setOpenForm}
        currentPatient={currentPatient}
        setCurrentPatient={setCurrentPatient}
      />
    </Box>
  );
};

export default Patients;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  outLine: "none",
  paddingBottom: 1,
};

function PatientInput({ openForm, setOpenForm, currentPatient }) {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
      <Modal
        open={openForm}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description">
        <Box sx={{ ...style, overflow: "clip" }}>
          <FormDialog
            open={openForm}
            setOpen={setOpenForm}
            currentPatient={currentPatient}
          />
        </Box>
      </Modal>
    </div>
  );
}

function NestedModal({
  open,
  setOpen,
  currentPatient,
  handleDelete,
  setOpenForm,
  // addPatient,
}) {
  const { events } = useContext(DataContext);
  const [currApp, setCurrApp] = useState();
  useEffect(() => {
    setCurrApp(events.filter((eve) => eve.title === currentPatient.title));
  }, [currentPatient, events]);
  console.log(currApp);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">
        {currentPatient && (
          <Box sx={{ ...style, overflow: "clip" }}>
            <Stack
              bgcolor={"#7575ff"}
              color="white"
              direction="row"
              p={1}
              justifyContent="space-between"
              alignItems="center">
              <Typography variant="h6">Patient Details</Typography>
              <IconButton onClick={() => setOpen(false)}>
                <CloseOutlinedIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
            <Box sx={{ mb: 1, height: 400, overflowY: "scroll" }}>
              <Stack direction="row">
                <Stack m={2} gap={2}>
                  <Typography
                    variant="p"
                    fontSize="small"
                    fontWeight="bold"
                    noWrap>
                    Patient Id
                  </Typography>
                  <Typography
                    variant="p"
                    fontSize="small"
                    fontWeight="bold"
                    noWrap>
                    Patient Name
                  </Typography>
                  <Typography
                    variant="p"
                    fontSize="small"
                    fontWeight="bold"
                    noWrap>
                    Gender
                  </Typography>
                  <Typography
                    variant="p"
                    fontSize="small"
                    fontWeight="bold"
                    noWrap>
                    DOB
                  </Typography>
                  <Typography
                    variant="p"
                    fontSize="small"
                    fontWeight="bold"
                    noWrap>
                    Blood Group
                  </Typography>
                  <Typography
                    variant="p"
                    fontSize="small"
                    fontWeight="bold"
                    noWrap>
                    Mobile Number
                  </Typography>
                  <Typography
                    variant="p"
                    fontSize="small"
                    fontWeight="bold"
                    noWrap>
                    Email
                  </Typography>
                  <Typography
                    variant="p"
                    fontSize="small"
                    fontWeight="bold"
                    noWrap>
                    Symptoms
                  </Typography>
                </Stack>
                <Stack m={2} gap={2}>
                  <Typography variant="p" fontSize="small">
                    {currentPatient.Id}
                  </Typography>
                  <Typography variant="p" fontSize="small">
                    {currentPatient.title}
                  </Typography>
                  <Typography variant="p" fontSize="small">
                    {currentPatient.Gender}
                  </Typography>
                  <Typography variant="p" fontSize="small">
                    {currentPatient.DOB &&
                      `${currentPatient.DOB.getDate()}/${currentPatient.DOB.getMonth()}/${currentPatient.DOB.getFullYear()}`}
                  </Typography>
                  <Typography variant="p" fontSize="small">
                    {currentPatient.BloodGroup}
                  </Typography>
                  <Typography variant="p" fontSize="small">
                    {currentPatient.Mobile}
                  </Typography>
                  <Typography variant="p" fontSize="small">
                    {currentPatient.Email}
                  </Typography>
                  <Typography variant="p" fontSize="small">
                    {currentPatient.Symptoms}
                  </Typography>
                </Stack>
              </Stack>
              <Typography
                ml={2}
                color="#7575ff"
                fontWeight="bold"
                fontSize={12}>
                Appointment History
              </Typography>
              <Stack>
                {events
                  .filter((eve) => eve.title === currentPatient.title)
                  .map((ele) => (
                    <ListItem key={ele.id} alignItems="flex-start">
                      <ListItemText
                        sx={{ pl: 1, borderLeft: "2px solid red " }}
                        primary=""
                        secondary={
                          <React.Fragment>
                            <Typography
                              variant="p"
                              fontSize="small"
                              color="text.primary">
                              {`${
                                ele.start && ele.start.toString().slice(4, 15)
                              } Appointment with ${ele.DoctorName}`}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
              </Stack>
            </Box>
            <Stack direction="row" gap={1} justifyContent="end" pr={2}>
              <Button
                onClick={() => handleDelete(currentPatient.Id)}
                size="small"
                variant="outlined"
                sx={{ color: "#7575ff" }}>
                Delete
              </Button>
              <Button
                onClick={() => setOpenForm(true)}
                size="small"
                sx={{ bgcolor: "#7575ff" }}
                variant="contained">
                Edit
              </Button>
            </Stack>
          </Box>
        )}
      </Modal>
    </div>
  );
}
