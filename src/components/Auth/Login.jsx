import { useState } from "react";
import { Button, TextField, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Redirect, Link } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [successRedirect, setSuccessRedirect] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3003/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: username.toLocaleLowerCase().replace(/ /g,'_'),
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
        if (data.status === "success") {
          props.updateToken(data.sessionToken);
          props.updateRole(data.user.role);
          localStorage.setItem('username', data.user.username);
          localStorage.setItem('userId', data.user.id);
          setSuccessRedirect("/");
        } else {
          setSnackbarOpen(true);
          setAlertStatus('error');
          setAlertMessage('Failed to Login!')
        }
      });
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

  if (successRedirect === '/') {
    return <Redirect to={successRedirect} />
  }

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
      <Link to='/passwordresetrequest'>Forgot Password</Link>
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

export default Login;
