import { Alert, Stack } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function AlertMessage({ message, messageSt, open }) {
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Stack sx={{ width: "auto" }} spacing={2}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Note archived"
        action={action}
      >
        <Alert variant="filled" severity={messageSt}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
