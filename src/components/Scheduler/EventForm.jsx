import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { IconButton, Stack, Typography } from "@mui/material";
import { FormOfDialog } from "./CalendarDemo";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function EventForm({
  open,
  setOpen,
  currentEvent,
  setEventData,
  handleSubmit,
  handleDelete,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  // console.log("show event", currentEvent);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      {currentEvent && (
        <>
          <Modal
            sx={{ outline: "none" }}
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
            <Box
              sx={{
                ...style,
                width: 370,
                borderRadius: 2,
                overflow: "clip",
                outline: "none",
              }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  bgcolor: "#7575ff",
                  borderBottom: 1,
                  pl: 2,
                }}>
                <Stack>
                  <Typography variant="p" color="white">
                    Appointment Details
                  </Typography>
                  <Typography fontSize={12} color="white" variant="p">
                    {`${currentEvent.start
                      .toString()
                      .slice(
                        0,
                        10
                      )} ( ${currentEvent.start.toLocaleTimeString()}-${currentEvent.end.toLocaleTimeString()})`}
                  </Typography>
                </Stack>
                <IconButton onClick={() => handleClose()}>
                  <CloseIcon sx={{ color: "white" }} />
                </IconButton>
              </Stack>
              <Stack pl={1} mt={2} gap={1} direction="row">
                <Stack width={100} gap={2}>
                  <Typography fontWeight={"bold"} fontSize={12}>
                    Patient Name
                  </Typography>
                  <Typography fontWeight={"bold"} fontSize={12}>
                    Doctor Name
                  </Typography>
                  <Typography fontWeight={"bold"} fontSize={12}>
                    Note
                  </Typography>
                </Stack>
                <Stack gap={2}>
                  <Typography fontSize={12}>:</Typography>
                  <Typography fontSize={12}>:</Typography>
                  <Typography fontSize={12}>:</Typography>
                </Stack>

                <Stack pr={1} gap={2}>
                  <Typography fontSize={12}>{currentEvent.title}</Typography>
                  <Typography variant="p" fontSize={12}>
                    {!currentEvent.DoctorName
                      ? "General "
                      : currentEvent.DoctorName}
                  </Typography>
                  <Typography variant="p" fontSize={12}>
                    {currentEvent.Symptoms || " "}{" "}
                  </Typography>
                </Stack>
              </Stack>
              <Stack mt={1} p={1} direction="row" justifyContent="end" gap={2}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ bgcolor: "#7575ff" }}
                  onClick={() => {
                    setOpenEdit(true);
                    setOpen(false);
                  }}>
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ color: "#7575ff" }}
                  onClick={() => {
                    handleDelete(currentEvent);
                    setOpen(false);
                  }}>
                  Delete
                </Button>
              </Stack>
            </Box>
          </Modal>
          <EditEvent
            open={openEdit}
            setOpen={setOpenEdit}
            eventData={currentEvent}
            setEventData={setEventData}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
}

function EditEvent({ open, setOpen, eventData, setEventData, handleSubmit }) {
  return (
    <FormOfDialog
      open={open}
      setOpen={setOpen}
      eventData={eventData}
      setEventData={setEventData}
      handleSubmit={() => handleSubmit(true)}
      edit={true}
    />
  );
}
