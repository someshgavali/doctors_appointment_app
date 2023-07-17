import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ todaysEvents }) {
  return (
    <TableContainer sx={{ height: 200 }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}> Time</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Doctor Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Symptoms</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todaysEvents.map((row) => {
            let time = new Date(row.start).toLocaleTimeString().split(":");
            return (
              <TableRow
                key={row.start}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{`${time[0]}:${time[1]} ${time[2].slice(
                  2
                )}`}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.DoctorName}</TableCell>
                <TableCell>{row.Symptoms}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
