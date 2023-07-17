import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import CalendarDemo from "./CalendarDemo";
import { DataContext } from "../../dataContext";
import { waitingList } from "../../DataSource";
const Scheduler = () => {
  const { currentDoctorsData } = useContext(DataContext);
  const [doctor, setDoctor] = useState("");

  const handleChange = (event) => {
    setDoctor(event.target.value);
  };

  return (
    <Grid container sx={{ mt: 1 }} justifyContent="space-evenly">
      <Stack sx={{ display: { xs: "flex", md: "none" } }}>
        <FilterForm
          doctor={doctor}
          handleChange={handleChange}
          currentDoctorsData={currentDoctorsData}
        />
      </Stack>
      <Grid item xs={11} sm={11} md={9}>
        <CalendarDemo />
      </Grid>

      <Grid item xs={11} sm={11} md={2}>
        <Box
          sx={{ display: { xs: "none", md: "block" } }}
          item
          xs={11}
          sm={11}
          md={2}>
          <FilterForm
            doctor={doctor}
            handleChange={handleChange}
            currentDoctorsData={currentDoctorsData}
          />
        </Box>
        <Typography mt={2} align="center" fontWeight="bold">
          {" "}
          Waiting List
        </Typography>

        <WaitingList />
      </Grid>
    </Grid>
  );
};

export default Scheduler;

const FilterForm = ({ doctor, handleChange, currentDoctorsData }) => {
  return (
    <FormControl sx={{ width: 200, m: 1 }} size="small">
      <InputLabel id="demo-select-small-label">Choose Specialist</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={doctor}
        label="Age"
        sx={{ bgcolor: "#fff", borderRadius: 2 }}
        onChange={handleChange}>
        {currentDoctorsData.map((doc) => (
          <MenuItem value={doc.Id}>
            <Stack direction="row" alignItems="center" gap={1}>
              <img
                src={doc.imgURL}
                alt={doc.title}
                style={{ borderRadius: "50%" }}
                width="30vh"
                height="30vh"
              />
              <Typography>{`DR. ${doc.title}`}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const WaitingList = () => {
  return (
    <Box
      display="flex"
      gap={1}
      mt={1}
      justifyContent="space-evenly"
      flexWrap="wrap"
      sx={{
        height: 500,
        overflowY: "scroll",
        "::-webkit-scrollbar ": {
          display: "none",
        },
      }}>
      {waitingList &&
        waitingList.map((list) => {
          let time = list.start.toLocaleTimeString().split(":");
          let timeend = list.end.toLocaleTimeString().split(":");
          return (
            <Card
              draggable
              sx={{
                border: "1px solid #a09f9f ",
                height: 70,
                width: { md: 240, xs: 140 },
                bgcolor: "#fff5f5",
              }}>
              <CardContent sx={{ p: 1 }}>
                <Typography fontSize={12} color="text.primary">
                  {list.title}
                </Typography>
                <Typography fontSize={12} color="text.primary">
                  {`${time[0]}:${time[1]} ${time[2].slice(2)} - ${timeend[0]}:${
                    timeend[1]
                  } ${timeend[2].slice(2)}`}
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                  {`${list.DepartmentName} - ${list.Treatment}`}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
    </Box>
  );
};
