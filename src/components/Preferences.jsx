import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";

import { DataContext } from "../dataContext";
import {
  dayOfWeekList,
  endHours,
  startHours,
  timeSlots,
  views,
} from "../DataSource";

const Preferences = () => {
  const { preferences, setPreferences } = useContext(DataContext);
  return (
    <Box sx={{ p: { md: 5, xs: 2 } }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        display="inline-block"
        borderBottom={".2rem solid #7575ff"}>
        Preferences
      </Typography>

      <Stack gap={2} mt={3}>
        <Stack gap={0.5}>
          <Typography
            variant="p"
            fontSize="small"
            color="GrayText"
            fontWeight="bold">
            Default View
          </Typography>
          <Autocomplete
            disablePortal
            value={preferences.view}
            options={views.map((v) => v.Text)}
            onChange={(e, v) => setPreferences({ ...preferences, view: v })}
            size="small"
            sx={{ width: { md: 400, xs: "80%" } }}
            renderInput={(params) => (
              <TextField sx={{ bgcolor: "#fff" }} {...params} />
            )}></Autocomplete>
        </Stack>
        <Stack gap={0.5}>
          <Typography
            variant="p"
            fontSize="small"
            color="GrayText"
            fontWeight="bold">
            Calendar Start Time
          </Typography>
          <Autocomplete
            disablePortal
            options={startHours.map((v) => v.Text)}
            value={preferences.dayStart}
            onChange={(e, val) =>
              setPreferences({ ...preferences, dayStart: val })
            }
            size="small"
            sx={{ width: { md: 400, xs: "80%" } }}
            renderInput={(params) => (
              <TextField sx={{ bgcolor: "#fff" }} {...params} />
            )}></Autocomplete>
        </Stack>
        <Stack gap={0.5}>
          <Typography
            variant="p"
            fontSize="small"
            color="GrayText"
            fontWeight="bold">
            Calender End Time
          </Typography>
          <Autocomplete
            disablePortal
            options={endHours.map((v) => v.Text)}
            value={preferences.dayEnd}
            onChange={(e, val) =>
              setPreferences({ ...preferences, dayEnd: val })
            }
            size="small"
            sx={{ width: { md: 400, xs: "80%" } }}
            renderInput={(params) => (
              <TextField sx={{ bgcolor: "#fff" }} {...params} />
            )}></Autocomplete>
        </Stack>
        <Stack gap={0.5}>
          <Typography
            variant="p"
            fontSize="small"
            color="GrayText"
            fontWeight="bold">
            Slot Duration
          </Typography>
          <Autocomplete
            disablePortal
            options={timeSlots.map((v) => v.Text)}
            value={preferences.slot}
            onChange={(e, v) => {
              setPreferences({ ...preferences, slot: v });
            }}
            size="small"
            sx={{ width: { md: 400, xs: "80%" } }}
            renderInput={(params) => (
              <TextField sx={{ bgcolor: "#fff" }} {...params} />
            )}></Autocomplete>
        </Stack>
        {/* <Stack gap={0.5}>
          <Typography
            variant="p"
            fontSize="small"
            color="GrayText"
            fontWeight="bold">
            Booking Color
          </Typography>
          <Autocomplete
            disablePortal
            options={colorCategory.map((v) => v.Text)}
            size="small"
            sx={{ width: { md: 400, xs: "80%" } }}
            renderInput={(params) => <TextField sx={{    bgcolor: "#fff",
      }} {...params} />}></Autocomplete>
        </Stack> */}
        <Stack gap={0.5}>
          <Typography
            variant="p"
            fontSize="small"
            color="GrayText"
            fontWeight="bold">
            Week Start With
          </Typography>
          <Autocomplete
            disablePortal
            options={dayOfWeekList.map((v) => v.Text)}
            size="small"
            value={preferences.weekStart}
            onChange={(e, val) =>
              setPreferences({ ...preferences, weekStart: val })
            }
            sx={{ width: { md: 400, xs: "80%" } }}
            renderInput={(params) => (
              <TextField sx={{ bgcolor: "#fff" }} {...params} />
            )}></Autocomplete>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Preferences;
