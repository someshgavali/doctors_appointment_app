import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../dataContext";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import {
  dutyTimingsData,
  experienceData,
  specializationData,
} from "../../DataSource";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function FormDialog({ open, setOpen, doctorData }) {
  const { currentDoctorsData, setCurrentDoctorData, setRecentActivities } =
    useContext(DataContext);
  const handleClose = () => {
    setOpen(false);
  };
  const holdDoctor = { ...doctorData };
  // const newID = new Date().getTime();
  const [newDoctor, setNewDoctor] = useState({
    title: "",
    Gender: "",
    Id: "",
    imgURL: "",
    Education: "",
    Specialization: "",
    Experience: "",
    Designation: "",
    Email: "",
    Mobile: "",
    StartHour: "10:00",
    EndHour: "19:00",
    AvailableDays: [0, 1, 2, 3, 4],
    WorkDays: [
      {
        Day: "Sunday",
        Index: 0,
        Enable: true,
        WorkStartHour: new Date(2023, 5, 1, 8, 0),
        WorkEndHour: new Date(2023, 5, 1, 17, 0),
        BreakStartHour: new Date(2023, 5, 1, 12, 0),
        BreakEndHour: new Date(2023, 5, 1, 13, 0),
        State: "AddBreak",
      },
      {
        Day: "Monday",
        Index: 1,
        Enable: false,
        WorkStartHour: new Date(2023, 5, 2, 8, 0),
        WorkEndHour: new Date(2023, 5, 2, 17, 0),
        BreakStartHour: new Date(2023, 5, 2, 12, 0),
        BreakEndHour: new Date(2023, 5, 2, 13, 0),
        State: "TimeOff",
      },
      {
        Day: "Tuesday",
        Index: 2,
        Enable: true,
        WorkStartHour: new Date(2023, 5, 3, 8, 0),
        WorkEndHour: new Date(2023, 5, 3, 17, 0),
        BreakStartHour: new Date(2023, 5, 3, 12, 0),
        BreakEndHour: new Date(2023, 5, 3, 13, 0),
        State: "AddBreak",
      },
      {
        Day: "Wednesday",
        Index: 3,
        Enable: true,
        WorkStartHour: new Date(2023, 5, 4, 8, 0),
        WorkEndHour: new Date(2023, 5, 4, 17, 0),
        BreakStartHour: new Date(2023, 5, 4, 12, 0),
        BreakEndHour: new Date(2023, 5, 4, 13, 0),
        State: "AddBreak",
      },
      {
        Day: "Thursday",
        Index: 4,
        Enable: true,
        WorkStartHour: new Date(2023, 5, 5, 8, 0),
        WorkEndHour: new Date(2023, 5, 5, 17, 0),
        BreakStartHour: new Date(2023, 5, 5, 12, 0),
        BreakEndHour: new Date(2023, 5, 5, 13, 0),
        State: "AddBreak",
      },
      {
        Day: "Friday",
        Index: 5,
        Enable: true,
        WorkStartHour: new Date(2023, 5, 6, 8, 0),
        WorkEndHour: new Date(2023, 5, 6, 17, 0),
        BreakStartHour: new Date(2023, 5, 6, 12, 0),
        BreakEndHour: new Date(2023, 5, 6, 13, 0),
        State: "RemoveBreak",
      },
      {
        Day: "Saturday",
        Index: 6,
        Enable: false,
        WorkStartHour: new Date(2023, 5, 7, 8, 0),
        WorkEndHour: new Date(2023, 5, 7, 17, 0),
        BreakStartHour: new Date(2023, 5, 7, 12, 0),
        BreakEndHour: new Date(2023, 5, 7, 13, 0),
        State: "TimeOff",
      },
    ],
  });

  useEffect(() => {
    if (doctorData) setNewDoctor(doctorData);
  }, [doctorData]);

  const addDoctor = () => {
    setNewDoctor(newDoctor);
    let i = currentDoctorsData.indexOf(
      currentDoctorsData.find((val) => val.Id === holdDoctor.Id)
    );

    if (i > -1) currentDoctorsData[i] = newDoctor;
    else setCurrentDoctorData((prev) => [...prev, newDoctor]);
    setOpen(false);
    setNewDoctor({
      title: "",
      Gender: "",
      Id: "",
      imgURL: "",
      Education: "",
      Specialization: "",
      Experience: "",
      Designation: "",
      Email: "",
      Mobile: "",
      StartHour: "10:00",
      EndHour: "19:00",
      AvailableDays: [0, 1, 2, 3, 4],
    });
  };

  return (
    <div>
      {newDoctor && (
        <Dialog open={open} sx={{ width: 450, m: "auto" }}>
          <DialogTitle
            sx={{ p: 0 }}
            borderBottom={"1px solid rgb(230, 230, 230)"}>
            <Stack
              bgcolor={"#7575ff"}
              color="white"
              direction="row"
              p={1}
              justifyContent="space-between"
              alignItems="center">
              {doctorData ? "Edit Doctor" : "New Doctor"}
              <IconButton onClick={() => setOpen(false)}>
                <CloseRoundedIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Stack mt={1}>
              <label
                style={{
                  color: "black",
                  fontSize: "small",
                  fontWeight: "bold",
                }}
                htmlFor="name">
                Doctor Name
              </label>
              <TextField
                required
                id="name"
                value={newDoctor.title}
                onChange={(e) => {
                  setNewDoctor({
                    ...newDoctor,
                    title: e.target.value,
                    Id:
                      currentDoctorsData[currentDoctorsData.length - 1].Id + 1,
                  });
                }}
                fullWidth
                size="small"
              />
            </Stack>
            <Stack>
              <FormControl sx={{ mt: 1 }}>
                <FormLabel
                  style={{
                    color: "black",
                    fontSize: "small",
                    fontWeight: "bold",
                  }}
                  id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={newDoctor.Gender}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, Gender: e.target.value })
                  }>
                  <FormControlLabel
                    value="Female"
                    // sx={{ ".MuiFormControlLabel-label": { fontSize: "small" } }}
                    control={<Radio size="small" />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    // sx={{ ".MuiFormControlLabel-label": { fontSize: "small" } }}
                    control={<Radio size="small" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Other"
                    // sx={{ ".MuiFormControlLabel-label": { fontSize: "small" } }}
                    control={<Radio size="small" />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            <Stack mt={1}>
              <label
                style={{
                  color: "black",
                  fontSize: "small",
                  fontWeight: "bold",
                }}
                htmlFor="mobile">
                Mobile Number
              </label>
              <TextField
                id="mobile"
                type="tel"
                size="small"
                variant="outlined"
                value={newDoctor.Mobile}
                onChange={(e) => {
                  setNewDoctor({ ...newDoctor, Mobile: e.target.value });
                }}

                // sx={{ mt: 1, ml: 1, width: { xs: "48%", md: "49%" } }}
              />
            </Stack>
            <Stack mt={1}>
              <label
                style={{
                  color: "black",
                  fontSize: "small",
                  fontWeight: "bold",
                }}
                htmlFor="email">
                Email
              </label>
              <TextField
                id="email"
                fullWidth
                size="small"
                value={newDoctor.Email}
                onChange={(e) => {
                  setNewDoctor({ ...newDoctor, Email: e.target.value });
                }}
              />
            </Stack>

            <Stack direction="row">
              <Stack mt={1} sx={{ width: "49%" }}>
                <label
                  style={{
                    color: "black",
                    fontSize: "small",
                    fontWeight: "bold",
                  }}
                  htmlFor="department">
                  Department
                </label>
                <Autocomplete
                  id="department"
                  options={specializationData.map((val) => val.Text)}
                  fullWidth
                  // sx={{ mt: 1 }}
                  size="small"
                  value={newDoctor.Specialization}
                  onChange={(e, val) =>
                    setNewDoctor({ ...newDoctor, Specialization: val })
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
              <Stack mt={1} ml={1} sx={{ width: { xs: "48%", md: "49%" } }}>
                <label
                  style={{
                    color: "black",
                    fontSize: "small",
                    fontWeight: "bold",
                  }}
                  htmlFor="education">
                  Education
                </label>
                <TextField
                  id="education"
                  size="small"
                  variant="outlined"
                  type="text"
                  fullWidth
                  value={newDoctor.Education}
                  onChange={(e) => {
                    setNewDoctor({ ...newDoctor, Education: e.target.value });
                  }}

                  // sx={{ mt: 1, ml: 1, width: { xs: "48%", md: "49%" } }}
                />
              </Stack>
            </Stack>
            <Stack direction="row">
              <Stack mt={1} sx={{ width: "49%" }}>
                <label
                  style={{
                    color: "black",
                    fontSize: "small",
                    fontWeight: "bold",
                  }}
                  htmlFor="experience">
                  Experience
                </label>
                <Autocomplete
                  id="experience"
                  options={experienceData.map((val) => val.Text)}
                  fullWidth
                  // sx={{ mt: 1 }}
                  size="small"
                  value={newDoctor.Experience}
                  onChange={(e, val) =>
                    setNewDoctor({ ...newDoctor, Experience: val })
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
              <Stack mt={1} ml={1} sx={{ width: { xs: "48%", md: "49%" } }}>
                <label
                  style={{
                    color: "black",
                    fontSize: "small",
                    fontWeight: "bold",
                  }}
                  htmlFor="designation">
                  Designation
                </label>
                <TextField
                  id="designation"
                  size="small"
                  variant="outlined"
                  type="text"
                  fullWidth
                  value={newDoctor.Designation}
                  onChange={(e) => {
                    setNewDoctor({ ...newDoctor, Designation: e.target.value });
                  }}

                  // sx={{ mt: 1, ml: 1, width: { xs: "48%", md: "49%" } }}
                />
              </Stack>
            </Stack>
            <Stack direction="row" mt={1}>
              <Stack width={"49%"}>
                <label
                  style={{
                    color: "black",
                    fontSize: "small",
                    fontWeight: "bold",
                  }}
                  htmlFor="dutyTime">
                  Duty Time
                </label>
                <Autocomplete
                  id="dutyTime"
                  options={dutyTimingsData.map((val) => val.Text)}
                  fullWidth
                  // sx={{ mt: 1 }}
                  size="small"
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
              <Stack ml={1} width={"49%"}>
                <label
                  style={{
                    color: "black",
                    fontSize: "small",
                    fontWeight: "bold",
                  }}
                  htmlFor="profilePic">
                  Profile Photo
                </label>
                <TextField
                  id="profilePic"
                  type="file"
                  size="small"
                  onChange={(e) => {
                    // console.log(URL.createObjectURL(e.target.files[0]));
                    setNewDoctor({
                      ...newDoctor,
                      imgURL: URL.createObjectURL(e.target.files[0]),
                    });
                  }}
                />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              sx={{ color: "#7575ff" }}
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              sx={{ mr: 2, bgcolor: "#7575ff" }}
              variant="contained"
              onClick={() => {
                newDoctor.title && addDoctor();
                newDoctor.title &&
                  setRecentActivities((prev) => [
                    {
                      title: doctorData ? "Updated Doctor" : "Added New Doctor",
                      Message: `Dr.${newDoctor.title},${newDoctor.Specialization}`,
                      Time: "just now",
                    },
                    ...prev,
                  ]);
              }}>
              {doctorData ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
