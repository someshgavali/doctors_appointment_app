import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Box p={5}>
      <Typography
        variant="h6"
        fontWeight="bold"
        display="inline-block"
        borderBottom={".2rem solid #7575ff"}>
        About
      </Typography>
      <Stack mt={3}>
        <Typography variant="p" color="GrayText">
          This is a doctor appointment scheduling app build using ReactJS,
          Material UI, React-big-calendar and ChartJs.You can further explore
          the{" "}
          <a
            href="https://github.com/bvaibhav23/appointment-dashborad"
            target="_blank"
            rel="noreferrer">
            source code
          </a>{" "}
          of this application.
        </Typography>
      </Stack>
    </Box>
  );
};

export default About;
