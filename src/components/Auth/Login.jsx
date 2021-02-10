import { useState } from "react";
import { Button, TextField, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3003/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSnackbarOpen(true);
        setAlertStatus(data.status);
        setAlertMessage(data.message);
        props.updateToken(data.sessionToken)
      })
  };

  const snackbarClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAlert = () => {
    return alertStatus !== null ? (
      <Alert onClose={snackbarClose} severity={alertStatus}>
        {alertMessage}
      </Alert>
    ) : (
      <div>Alert!</div>
    );
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          type="password"
          label="Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Log In</Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={snackbarClose}
      >
        {handleAlert()}
      </Snackbar>
    </div>
  );
};

export default Login