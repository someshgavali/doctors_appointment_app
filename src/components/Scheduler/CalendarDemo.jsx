import React, {
  useState,
  useCallback,
  useMemo,
  Fragment,
  useEffect,
} from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useContext } from "react";
import { DataContext } from "../../dataContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Box, IconButton, Stack } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FormDialog from "../Patients/PatientForm";
import EventForm from "./EventForm";

const locales = {
  "en-IN": require("date-fns/locale/en-IN"),
};

export default function CalendarDemo() {
  const { events, setEvents, preferences, setRecentActivities } =
    useContext(DataContext);

  const [open, setOpen] = useState(false);
  const [openEvent, SetOpenEvent] = useState(false);
  let [eventData, setEventData] = useState({
    Id: "",
    title: "",
    Disease: "",
    DepartmentName: "",
    start: new Date(),
    end: new Date(),
    DoctorId: "",
    PatientId: "",
    Symptoms: "",
  });
  const [eventInfo, setEventInfo] = useState();

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => {
      return startOfWeek(new Date(), { weekStartsOn: weekStart });
    },
    getDay,
    locales,
  });
  const dayOfWeekList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [currentEvent, setCurrentEvent] = useState();
  const [slotDuration, setSlotDuration] = useState();
  const [weekStart, setWeekStart] = useState();
  // console.log(preferences, slotDuration);
  const handleSelectSlot = useCallback(
    ({ start, end, slots }) => {
      setOpen(true);
      // const title = window.prompt("New Event Name");
      // console.log(slots);
      setEventInfo(slots);
      setEventData({ eventData, start, end });
    },
    // eslint-disable-next-line
    [setEventInfo, setOpen]
  );

  const handleSubmit = (edit) => {
    // console.log("eventData", eventData);
    // console.log("eventInfo", eventInfo);
    if (edit) {
      eventData = { ...currentEvent };
    }
    const Id = events[events.length - 1].Id + 1;
    const i = events.indexOf(events.find((val) => val.Id === eventData.Id));
    if (eventData.title) {
      if (i === -1) {
        setEvents((prev) => [
          ...prev,
          { Id, start: eventInfo[0], end: eventInfo[1], ...eventData },
        ]);
        setRecentActivities((prev) => [
          {
            title: "Added New Appointment",
            Message:
              eventData &&
              `${eventData.title} for consultation on ${
                eventInfo[0] && eventInfo[0].toLocaleString()
              } with ${eventData.DoctorName}`,
            Time: "just now",
          },
          ...prev,
        ]);
      } else {
        events[i] = eventData;
        setRecentActivities((prev) => [
          {
            title: "Updated Appointment",
            Message:
              eventData &&
              eventInfo &&
              `${eventData.title} for consultation on ${
                eventInfo[0] && eventInfo[0].toLocaleString()
              } with ${eventData.DoctorName}`,
            Time: "just now",
          },
          ...prev,
        ]);
      }
    }
    // new Date().

    setEventData({ title: "" });
  };
  // console.log("events", events);

  const handleSelectEvent = useCallback(
    (event) => {
      // console.log(event);
      SetOpenEvent(true);
      setCurrentEvent(event);
    },
    // eslint-disable-next-line
    [events]
  );
  const handleDelete = (event) => {
    setEvents(events.filter((ele) => ele.Id !== event.Id));
  };

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(),
    }),
    []
  );

  useEffect(
    () => {
      if (!preferences.slot) setSlotDuration(30);
      else setSlotDuration(Number(preferences.slot.slice(0, 3)));
      if (!preferences.weekStart) setWeekStart(0);
      else setWeekStart(dayOfWeekList.indexOf(preferences.weekStart));
    },
    // eslint-disable-next-line
    [preferences.slot]
  );
  // console.log(
  //   preferences.dayStart.split(":")[0],
  //   preferences.dayEnd.split(":")[0]
  // );

  const today = new Date();
  return (
    <Fragment>
      <Box
        p={1}
        m={1}
        sx={{
          borderTop: "5px solid #7575ff",
          borderRadius: 3,
          boxShadow: 3,
          overflow: "clip",
          bgcolor: "#fff",
        }}>
        <Calendar
          dayLayoutAlgorithm={"no-overlap"}
          defaultDate={defaultDate}
          defaultView={
            preferences.view === "Daily"
              ? Views.DAY
              : preferences.view === "Monthly"
              ? Views.MONTH
              : Views.WEEK
          }
          min={
            new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              Number(preferences.dayStart.split(":")[0])
            )
          }
          max={
            new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              Number(preferences.dayEnd.split(":")[0]) + 12
            )
          }
          events={events}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
          timeslots={1}
          step={slotDuration}
          style={{
            height: 600,
          }}
          eventPropGetter={(e) => {
            if (e.DepartmentName === "General Medicine") {
              return { style: { backgroundColor: "#df5286" } };
            } else if (e.DepartmentName === "Neurology") {
              return { style: { backgroundColor: "#1aaa55" } };
            } else if (e.DepartmentName === "Dermatology") {
              return { style: { backgroundColor: "#865fcf" } };
            } else if (e.DepartmentName === "Orthopedics") {
              return { style: { backgroundColor: "#fec200" } };
            } else if (e.DepartmentName === "Diabetology") {
              return { style: { backgroundColor: "#ea7a57" } };
            } else if (e.DepartmentName === "Cardiology") {
              return { style: { backgroundColor: "#00bdae" } };
            }
          }}
        />
        <FormOfDialog
          open={open}
          setOpen={setOpen}
          setEventData={setEventData}
          handleSubmit={handleSubmit}
          eventData={eventData}
        />
        <EventForm
          open={openEvent}
          setOpen={SetOpenEvent}
          currentEvent={currentEvent}
          setEventData={setCurrentEvent}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
        />
      </Box>
    </Fragment>
  );
}

export function FormOfDialog({
  open,
  setOpen,
  eventData,
  setEventData,
  handleSubmit,
  edit,
}) {
  const { patientsInfo, currentDoctorsData } = useContext(DataContext);
  const [OpenPatient, setOpenPatient] = useState();
  const handleClose = () => {
    setOpen(false);
  };

  //Js Date to HTML datetimeLocal conversion
  // const dateTimeLocalValue = (new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
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
            {edit ? "Edit Appointment" : "Add Appointment"}
            <IconButton onClick={() => handleClose()}>
              <CloseRoundedIcon sx={{ color: "white" }} />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ p: 1 }}>
          <Stack mt={1}>
            <label
              style={{
                color: "black",
                fontSize: "small",
                fontWeight: "bold",
              }}
              htmlFor="name">
              Patient Name
            </label>
            <Stack direction="row" alignItems="center">
              <Autocomplete
                disablePortal
                id="name"
                options={patientsInfo.map((e) => e.title)}
                fullWidth
                size="small"
                // value={title}
                value={eventData.title}
                onChange={(e, val) => {
                  setEventData({ ...eventData, title: val });
                }}
                // onChange={(e) => setTitle(e.target.value)}
                renderInput={(params) => <TextField {...params} />}
              />
              <IconButton>
                <AddCircleRoundedIcon
                  fontSize="large"
                  sx={{ color: "#7575ff" }}
                  onClick={() => setOpenPatient(true)}
                />
              </IconButton>
            </Stack>
          </Stack>

          <Stack direction="row">
            <Stack mt={1} width="49%">
              <label
                style={{
                  color: "black",
                  fontSize: "small",
                  fontWeight: "bold",
                }}
                htmlFor="title">
                Title
              </label>
              <TextField id="title" size="small" variant="outlined" />
            </Stack>
            <Stack mt={1} sx={{ ml: 1, width: { xs: "48%", md: "49%" } }}>
              <label
                style={{
                  color: "black",
                  fontSize: "small",
                  fontWeight: "bold",
                }}
                htmlFor="location">
                Location
              </label>
              <TextField
                id="location"
                size="small"
                variant="outlined"

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
                htmlFor="startDate">
                Start Date
              </label>
              <TextField
                id="startDate"
                size="small"
                type="datetime-local"
                fullWidth
                value={
                  eventData.start &&
                  new Date(
                    eventData.start.getTime() -
                      eventData.start.getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .slice(0, -1)
                }
                onChange={(e) => {
                  setEventData({
                    ...eventData,
                    start: new Date(e.target.value),
                  });
                }}
                // sx={{ mt: 1, width: "49%" }}
                variant="outlined"
              />
            </Stack>
            <Stack mt={1} ml={1} sx={{ width: { xs: "48%", md: "49%" } }}>
              <label
                style={{
                  color: "black",
                  fontSize: "small",
                  fontWeight: "bold",
                }}
                htmlFor="endDate">
                End Date
              </label>
              <TextField
                id="endDate"
                size="small"
                variant="outlined"
                type="datetime-local"
                fullWidth
                value={
                  eventData.end &&
                  new Date(
                    eventData.end.getTime() -
                      eventData.end.getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .slice(0, -1)
                }
                // value={eventData.end}
                onChange={(e) => {
                  setEventData({ ...eventData, end: new Date(e.target.value) });
                }}
                // sx={{ mt: 1, ml: 1, width: { xs: "48%", md: "49%" } }}
              />
            </Stack>
          </Stack>

          <Stack mt={1}>
            <label
              style={{ color: "black", fontSize: "small", fontWeight: "bold" }}
              htmlFor="department">
              Department
            </label>
            <Autocomplete
              disablePortal
              id="department"
              options={[
                ...new Set(currentDoctorsData.map((val) => val.Specialization)),
              ]}
              value={eventData.DepartmentName}
              onChange={(e, val) => {
                setEventData({ ...eventData, DepartmentName: val });
              }}
              fullWidth
              // sx={{ mt: 1 }}
              size="small"
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
          <Stack mt={1}>
            <label
              style={{ color: "black", fontSize: "small", fontWeight: "bold" }}
              htmlFor="consultation">
              Consultation
            </label>
            <Autocomplete
              disablePortal
              id="consultation"
              options={[...new Set(currentDoctorsData.map((val) => val.title))]}
              value={eventData.DoctorName}
              onChange={(e, val) => {
                setEventData({ ...eventData, DoctorName: val });
              }}
              fullWidth
              // sx={{ mt: 1 }}
              size="small"
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
          <Stack mt={1}>
            <label
              style={{ color: "black", fontSize: "small", fontWeight: "bold" }}
              htmlFor="symptoms">
              Symptoms
            </label>
            <TextField
              id="symptoms"
              multiline
              fullWidth
              // sx={{ mt: 1 }}
              size="small"
              value={eventData.Symptoms}
              onChange={(e) => {
                setEventData({ ...eventData, Symptoms: e.target.value });
              }}
              rows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            size="small"
            sx={{ color: "#7575ff" }}>
            Cancel
          </Button>
          <Button
            sx={{ bgcolor: "#7575ff" }}
            variant="contained"
            size="small"
            onClick={() => {
              handleSubmit();
              handleClose();
            }}>
            {edit ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
      <FormDialog
        open={OpenPatient}
        setOpen={setOpenPatient}
        currentPatient={[]}
      />
    </div>
  );
}
