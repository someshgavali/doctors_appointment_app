import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { DataContext } from "../../dataContext";
import FormDialog from "./DoctorForm";

const DoctorsInfo = () => {
  const { doctorId } = useParams();
  const { currentDoctorsData, setCurrentDoctorData } = useContext(DataContext);
  const [doctorData, setDoctorData] = useState();
  const availability = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const navTO = useNavigate();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setDoctorData(
      currentDoctorsData.find((info) => info.Id === Number(doctorId))
    );
  }, [doctorId, currentDoctorsData, open]);
  // console.log(doctorData);
  //   const d=new Date();
  //   d.toLocaleTimeString
  const deleteDoctor = (id) => {
    navTO("/doctors");
    // console.log("id", id);
    setCurrentDoctorData(
      currentDoctorsData.filter((ele) => {
        // console.log(ele.Id, id);
        return ele.Id !== Number(id); // Check for data type
      })
    );
  };
  return (
    <Box p={5}>
      <Stack direction="row" alignItems="center">
        <ArrowBackIosIcon
          sx={{ cursor: "pointer" }}
          onClick={() => navTO("/doctors")}
        />
        <Typography
          variant="h6"
          fontWeight="bold"
          display="inline-block"
          borderBottom={".2rem solid #7575ff"}>
          DOCTORS DETAILS
        </Typography>
      </Stack>
      <Box display="flex" justifyContent="end" mt={1}>
        <Button
          sx={{
            ml: 1,
            bgcolor: "red",
            fontSize: { xs: ".5rem", md: ".8rem" },
          }}
          variant="contained"
          onClick={() => deleteDoctor(doctorId)}>
          Delete
        </Button>
        <Button
          sx={{
            ml: 1,
            bgcolor: "#7575ff",
            fontSize: { xs: ".5rem", md: ".8rem" },
          }}
          variant="contained"
          onClick={() => setOpen(true)}>
          Edit
        </Button>
      </Box>
      {doctorData && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            mt: 3,
            justifyContent: "space-evenly",
          }}>
          <Stack direction="row" gap={3}>
            <img
              src={doctorData.imgURL}
              alt={doctorData.title}
              style={{ borderRadius: "50%" }}
              width="100vh"
              height="100vh"
            />
            <Stack gap={1}>
              <Stack>
                <Typography
                  variant="h6"
                  fontWeight="bold">{`DR. ${doctorData.title}`}</Typography>
                <Typography variant="p" fontSize={12}>
                  {doctorData.Education}
                </Typography>
                <Typography variant="p" fontSize={12}>
                  {doctorData.Designation}
                </Typography>
              </Stack>
              <Stack gap={2}>
                <Stack>
                  <Typography variant="p" fontSize={12} color={"GrayText"}>
                    Specialization
                  </Typography>
                  <Typography variant="p" fontSize={13}>
                    {doctorData.Specialization}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="p" fontSize={12} color={"GrayText"}>
                    Experience
                  </Typography>
                  <Typography variant="p" fontSize={13}>
                    {doctorData.Experience}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="p" fontSize={12} color={"GrayText"}>
                    Availability
                  </Typography>
                  <Stack direction="row">
                    {doctorData.AvailableDays &&
                      doctorData.AvailableDays.map((val, i) => (
                        <Typography key={i} variant="span" mr={1} fontSize={13}>
                          {availability[val]}
                        </Typography>
                      ))}
                    <Typography variant="span" mr={1} fontSize={13}>
                      {`-${doctorData.StartHour}-${doctorData.EndHour}`}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack>
                  <Typography variant="p" fontSize={12} color={"GrayText"}>
                    Mobile
                  </Typography>
                  <Typography variant="p" fontSize={13}>
                    {doctorData.Mobile}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{ mt: { xs: 4, md: 0 } }} gap={1}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="p" fontSize={16} color={"GrayText"}>
                Break Hours:
              </Typography>
              <AddCircleRoundedIcon
                fontSize="large"
                sx={{ color: "#7575ff", cursor: "pointer" }}
              />
            </Stack>
            {doctorData.WorkDays && (
              <Stack direction="row" gap={5}>
                <Stack gap={1}>
                  {doctorData.WorkDays.map((val, i) => (
                    <Typography key={i} variant="p" fontSize={14}>
                      {val.Day}
                    </Typography>
                  ))}
                </Stack>
                <Stack gap={1} alignItems="center" justifyContent="center">
                  {doctorData.WorkDays.map((val, i) =>
                    val.State === "TimeOff" ? (
                      <Typography key={i} fontSize={14} color="red">
                        TIME OFF
                      </Typography>
                    ) : (
                      <Typography key={i} variant="p" fontSize={14}>
                        {val.WorkStartHour.toLocaleTimeString().replace(
                          ":00 ",
                          " "
                        ) +
                          " - " +
                          val.WorkEndHour.toLocaleTimeString().replace(
                            ":00 ",
                            " "
                          )}
                      </Typography>
                    )
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Box>
      )}
      <FormDialog open={open} setOpen={setOpen} doctorData={doctorData} />
    </Box>
  );
};

export default DoctorsInfo;
