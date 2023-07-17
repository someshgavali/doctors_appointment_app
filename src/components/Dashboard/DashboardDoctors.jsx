import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { DataContext } from "../../dataContext";
import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function DashboardDoctors() {
  const { currentDoctorsData } = useContext(DataContext);
  return (
    <Box pb={1}>
      <Stack p={1} direction="row" justifyContent="space-between">
        <Typography variant="p" fontWeight="bold">
          Doctor's Availability
        </Typography>
        <Link to="/doctors">View all</Link>
      </Stack>
      <List
        sx={{
          height: 350,
          width: "100%",
          bgcolor: "background.paper",
          overflowY: "scroll",
        }}>
        {currentDoctorsData &&
          currentDoctorsData.slice(0, 5).map((val, i) => (
            <>
              <ListItem key={i} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={val.title} src={val.imgURL} />
                </ListItemAvatar>
                <ListItemText
                  primary={val.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.secondary">
                        {val.Specialization}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider key={i + 100} />
            </>
          ))}
      </List>
    </Box>
  );
}
