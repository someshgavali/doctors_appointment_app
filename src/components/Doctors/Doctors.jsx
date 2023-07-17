import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { DataContext } from "../../dataContext";
import FormDialog from "./DoctorForm";

const Doctors = () => {
  const { currentDoctorsData } = useContext(DataContext);
  const navTo = useNavigate();
  const [filterData, setFilterData] = useState(currentDoctorsData);
  const [specialty, setSpecialty] = useState(null);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (specialty === null) setFilterData(currentDoctorsData);
    else
      setFilterData(
        currentDoctorsData.filter((val) => val.Specialization === specialty)
      );
  }, [specialty, currentDoctorsData]);
  // console.log(filterData);
  return (
    <Box sx={{ p: { md: 5, sm: 5, xs: 2 } }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={1}
        display="inline-block"
        borderBottom={".2rem solid #7575ff"}>
        DOCTORS LIST
      </Typography>
      <Box display="flex" justifyContent="end">
        <Autocomplete
          id="specialization"
          options={[
            ...new Set(currentDoctorsData.map((val) => val.Specialization)),
          ]}
          onChange={(e, val) => {
            setSpecialty(val);
          }}
          size="small"
          sx={{ width: "30vh", bgcolor: "#fff" }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Select a specialization" />
          )}
        />
        <Button
          sx={{
            ml: 1,
            bgcolor: "#7575ff",
            // fontSize: { xs: 8 },
            width: 200,
            ":hover": { bgcolor: "#7f7fed" },
          }}
          size="small"
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}>
          Add Doctor
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
          mt: 3,
          justifyContent: { xs: "center", md: "start" },
        }}>
        {filterData.map((info) => (
          <Card
            key={info.Id}
            sx={{
              width: { xs: "100%", md: "48%" },
              ":hover": { boxShadow: " .1rem .1rem 2rem .1rem #7575ff" },
            }}
            onClick={() => navTo(`/doctor/${info.Id}`)}>
            <CardContent>
              <Stack direction="row" gap={2}>
                <img
                  src={info.imgURL}
                  alt={info.title}
                  style={{ borderRadius: "50%" }}
                  width="80vh"
                  height="80vh"
                />
                <Stack gap={1}>
                  <Stack>
                    <Typography>{`DR. ${info.title}`}</Typography>
                    <Typography variant="p" fontSize={12}>
                      {info.Education}
                    </Typography>
                  </Stack>
                  <Stack direction="row" gap={2}>
                    <Stack>
                      <Typography variant="p" fontSize={12} color={"GrayText"}>
                        Designation
                      </Typography>
                      <Typography noWrap fontSize={14}>
                        {info.Designation}
                      </Typography>
                    </Stack>
                    <Divider orientation="vertical" />
                    <Stack>
                      <Typography variant="p" fontSize={12} color={"GrayText"}>
                        Experience
                      </Typography>
                      <Typography fontSize={14} noWrap>
                        {" "}
                        {info.Experience}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
      <FormDialog open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Doctors;
